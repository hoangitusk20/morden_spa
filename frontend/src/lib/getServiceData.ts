import { Service } from "@/shared/type";

export async function getServiceData(): Promise<Service[]> {
  console.log("url from service ", process.env.NEXT_API_URL);
  const res = await fetch(`${process.env.NEXT_API_URL}/service`, {
    next: {
      revalidate: false,
      tags: ["service-data"],
    },
  });

  console.log(res);
  if (!res.ok) {
    throw new Error("Failed to fetch service data");
  }

  const data: Service[] = await res.json();
  return data;
}

export async function getServiceDetail(id: string): Promise<Service> {
  const res = await fetch(`${process.env.NEXT_API_URL}/service/${id}`, {
    next: {
      revalidate: false,
      tags: [`service-detail-${id}`],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch service detail for slug: ${id}`);
  }

  const data: Service = await res.json();
  return data;
}

export async function getRelatedService(id: string): Promise<Service[]> {
  const res = await fetch(`${process.env.NEXT_API_URL}/service/${id}/related`, {
    next: {
      revalidate: false,
      tags: [`related-service-${id}`],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch related services for id: ${id}`);
  }

  const data: Service[] = await res.json();
  return data;
}
