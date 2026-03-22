import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const R2_ACCOUNT_ID = "68ec68ffd87c967290cf8f0e8b7efc29";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    return NextResponse.json(
      { error: "R2 credentials not configured" },
      { status: 500 }
    );
  }

  const url = await getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME ?? "herald-data-main",
      Key:    "varun_vijaykumar.pdf",
      ResponseContentDisposition: 'attachment; filename="Varun_Vijaykumar_CV.pdf"',
    }),
    { expiresIn: 60 } // URL valid for 60 seconds
  );

  return NextResponse.redirect(url);
}
