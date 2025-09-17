import { NextResponse } from "next/server";
import { db } from "@/app/dbconfiguration/db";
import { products } from "../../../../drizzle/schema";
import { v4 as uuid } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const thumbnailFile = formData.get('thumbnail');
    const photoModel1File = formData.get('photoModel1');
    const photoModel2File = formData.get('photoModel2');

    if (!name || !description || !price || !thumbnailFile) {
      return NextResponse.json({ message: "Name, description, price, and a thumbnail image are required." }, { status: 400 });
    }

    const saveFile = async (file) => {
      if (!file || typeof file === 'string') return null;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      const fileName = `${uuid()}-${file.name}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      return `/uploads/${fileName}`;
    };

    const thumbnailUrl = await saveFile(thumbnailFile);
    const photoModel1Url = await saveFile(photoModel1File);
    const photoModel2Url = await saveFile(photoModel2File);

    await db.insert(products).values({
      id: uuid(),
      name,
      description,
      price: parseFloat(price),
      thumbnail: thumbnailUrl,
      photoModel1: photoModel1Url,
      photoModel2: photoModel2Url,
    });

    return NextResponse.json({ message: "Product created successfully." }, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { message: "An error occurred during product creation.", error: error.message },
      { status: 500 }
    );
  }
}