import { notFound } from "next/navigation";

type TParams = {
  searchTerm?: string;
  page?: string;
  categories?: string;
  limit?: string;
  fields?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export async function getAllProducts({params}: {params?:TParams}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/products?${queryString}`, {
      next: { revalidate: 300},
  });
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error("Please try again");
  }
  const json = await res.json();
  return json.data;
}

export async function getDashboardAnalytics() {
  const res = await fetch(`${BASE_URL}/products/analytics`, {
      next: { revalidate: 300},
  });
  if (res.status === 404) {
    return notFound();
  }
  if (!res.ok) {
    throw new Error("Please try again");
  }
  const json = await res.json();
  return json.data;
}