import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { tag, secret } = await request.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    revalidateTag(tag);

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      tag,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error revalidating" }, { status: 500 });
  }
}
