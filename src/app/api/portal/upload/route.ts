import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];
  const clientName = (formData.get("clientName") as string) || "anonimo";

  if (!files.length) {
    return NextResponse.json({ error: "No se recibieron archivos" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "tmp-uploads", clientName.replace(/[^a-z0-9-_]/gi, "_"));
  await mkdir(uploadDir, { recursive: true });

  const saved: string[] = [];
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const safeName = `${Date.now()}-${file.name.replace(/[^a-z0-9.\-_]/gi, "_")}`;
    await writeFile(path.join(uploadDir, safeName), buffer);
    saved.push(safeName);
  }

  return NextResponse.json({ ok: true, saved });
}
