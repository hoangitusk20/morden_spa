// app/api/service/route.js
export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_API_URL}/service`, {
      next: {
        revalidate: false, // Không tự động revalidate
        tags: ["service-data"], // Tag để revalidate on-demand
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch service data");
    }

    const data = await response.json();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=59", // Cache 24h
      },
    });
  } catch (error) {
    console.error("Error fetching service data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
