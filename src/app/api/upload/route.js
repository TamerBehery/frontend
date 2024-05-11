import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (request) => {
  const file = await request.formData();
  const image = file.get("image");
  const bytelength = await image.arrayBuffer();
  const bufferData = Buffer.from(bytelength);
  const pathOfImage = `./public/images/${new Date().getTime()}${path.extname(
    image.name
  )}`;
  
  writeFile(pathOfImage, bufferData);

  return NextResponse.json({image: pathOfImage.replace("./public", "")});
};
