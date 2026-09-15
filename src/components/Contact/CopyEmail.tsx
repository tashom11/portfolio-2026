"use client";

import { useState } from "react";
import styles from "./Contact.module.scss";

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  function copyWithSelection() {
    const previousFocus = document.activeElement;
    const field = document.createElement("textarea");
    field.value = email;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
    return copied;
  }

  async function copy() {
    let copied = false;

    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      copied = copyWithSelection();
    }

    setStatus(copied ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 3000);
  }

  return (
    <>
      <button className={styles.copy} type="button" onClick={copy} aria-describedby="copy-status">
        {status === "copied" ? "Adresse copiée ✓" : "Copier l’adresse"}
      </button>
      <span className="sr-only" id="copy-status" role="status" aria-live="polite">
        {status === "copied" && "L’adresse e-mail a été copiée dans le presse-papiers."}
        {status === "error" && "La copie a échoué. L’adresse e-mail reste disponible dans le lien précédent."}
      </span>
    </>
  );
}
