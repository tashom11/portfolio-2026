import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("ne présente aucune violation WCAG A ou AA détectable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("permet d’éviter la navigation et de poursuivre au clavier", async ({ page }) => {
  const skipLink = page.getByRole("link", { name: "Aller au contenu" });

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.locator("#projets article a").first()).toBeFocused();
});

test("affiche un indicateur de focus sur chaque contrôle", async ({ page }) => {
  const controls = page.locator("a[href], button:not([disabled])");
  const count = await controls.count();

  for (let index = 0; index < count; index += 1) {
    await page.keyboard.press("Tab");
    const focusedStyle = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement)) return null;
      const style = getComputedStyle(element);
      return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
    });

    expect(focusedStyle?.style).not.toBe("none");
    expect(focusedStyle?.width).toBeGreaterThanOrEqual(2);
  }
});

test("annonce la confirmation de copie", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => undefined },
    });
  });
  await page.getByRole("button", { name: "Copier l’adresse" }).click();
  await expect(page.getByRole("status")).toContainText("copiée dans le presse-papiers");
});

test("annonce les liens qui ouvrent un nouvel onglet", async ({ page }) => {
  const externalLinks = page.locator('a[target="_blank"]');
  const count = await externalLinks.count();

  for (let index = 0; index < count; index += 1) {
    const link = externalLinks.nth(index);
    const accessibleText = `${await link.getAttribute("aria-label") ?? ""} ${await link.textContent() ?? ""}`;
    expect(accessibleText).toContain("nouvel onglet");
  }
});

test("conserve une mise en page sans défilement horizontal à 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.reload();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test("permet de revenir en haut de la page", async ({ page }) => {
  const backToTop = page.getByRole("button", { name: "Retour en haut de la page" });

  await expect(backToTop).toBeHidden();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(backToTop).toBeVisible();

  await backToTop.click();
  await expect(page.locator("main")).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("maintient le retour en haut au-dessus du pied de page", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 800 }, { width: 320, height: 800 }]) {
    await page.setViewportSize(viewport);
    await page.reload();
    await page.locator("footer").scrollIntoViewIfNeeded();

    const backToTop = page.getByRole("button", { name: "Retour en haut de la page" });
    await expect(backToTop).toBeVisible();
    await expect.poll(async () => {
      const buttonBox = await backToTop.boundingBox();
      const footerBox = await page.locator("footer").boundingBox();
      if (!buttonBox || !footerBox) return 0;
      return footerBox.y - (buttonBox.y + buttonBox.height);
    }).toBeGreaterThanOrEqual(15);
  }
});

test("laisse le contenu disponible sans JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Quelques projets" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Expérience", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Une opportunité ? Parlons-en." })).toBeVisible();

  await context.close();
});

test("propose une liste de hobbies et des vues détaillées", async ({ page }) => {
  await page.goto("/hobbies");
  await expect(page.getByRole("heading", { level: 1, name: "Hobbies." })).toBeVisible();

  const firstArticle = page.locator("main article a").first();
  await expect(firstArticle).toHaveAttribute("href", /^\/hobbies\//);
  await firstArticle.click();

  await expect(page.getByRole("link", { name: /Tous les hobbies/ })).toBeVisible();
  await expect(page.locator("main article h1")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Sommaire de l’article" })).toBeVisible();
});

test("ne présente aucune violation détectable sur les pages Hobbies", async ({ page }) => {
  await page.goto("/hobbies");
  let results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);

  await page.locator("main article a").first().click();
  results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

test("propose les sites officiels des services du homelab", async ({ page }) => {
  await page.goto("/hobbies/homelab");

  const services = ["Jellyfin", "Navidrome", "Immich", "Pi-hole", "Nginx Proxy Manager", "Beszel"];
  for (const service of services) {
    const link = page.getByRole("link", { name: `${service}, site officiel, nouvel onglet` });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("target", "_blank");
  }
});

test("ouvre la page Hobbies en haut", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.getByRole("link", { name: "Hobbies" }).click();

  await expect(page).toHaveURL(/\/hobbies$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("rejoue la transition entre les pages", async ({ page }) => {
  const transition = page.locator("[data-page-transition]");
  await expect(transition).toHaveCount(0);

  await page.getByRole("link", { name: "Hobbies" }).click();

  await expect(page).toHaveURL(/\/hobbies$/);
  await expect(transition).toHaveCount(1);
  await expect(transition.locator("span").first()).toHaveCSS("animation-name", /reveal-page/);
});

test("ne joue pas la transition pour une ancre de l’accueil", async ({ page }) => {
  await page.getByRole("link", { name: "Projets" }).click();

  await expect(page).toHaveURL(/\/#projets$/);
  await expect(page.locator("[data-page-transition]")).toHaveCount(0);
});

test.describe("avec réduction des animations", () => {
  test.use({ reducedMotion: "reduce" });

  test("rend immédiatement tous les contenus", async ({ page }) => {
    await expect(page.locator("[data-page-transition]")).toBeHidden();
    await expect(page.locator(".reveal").first()).toHaveCSS("opacity", "1");
    await expect(page.locator(".reveal").first()).toHaveCSS("transform", "none");
  });
});
