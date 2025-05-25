import { revalidateTag } from "next/cache";

export async function POST(request) {
  try {
    const { tag, secret } = await request.json();

    // Kiểm tra secret để bảo mật
    if (secret !== process.env.REVALIDATE_SECRET) {
      return Response.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate theo tag
    revalidateTag(tag);

    return Response.json({
      revalidated: true,
      now: Date.now(),
      tag,
    });
  } catch (error) {
    return Response.json({ error: "Error revalidating" }, { status: 500 });
  }
}
