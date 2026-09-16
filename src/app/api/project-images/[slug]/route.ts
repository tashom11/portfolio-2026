import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

import { projects } from "@/data/projects";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project?.image) {
    return new NextResponse("Image not found", { status: 404 });
  }

  try {
    const result = await get(project.image, { access: "private" });

    if (result?.statusCode !== 200) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "Content-Type": result.blob.contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Image unavailable", { status: 503 });
  }
}
