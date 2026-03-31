import { Property } from "@/types/property.types";
import { cookies } from "next/headers";
import { BACKEND_API_BASE_URL } from "./constants";

export default async function getFavourites(): Promise<Property[]> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("connect.sid");

    const res = await fetch(`${BACKEND_API_BASE_URL}/property/favourites`, {
      cache: "no-store",
      headers: {
        Cookie: `connect.sid=${sessionCookie?.value}`,
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.map((item: { property: Property }) => item.property);
  } catch {
    return [];
  }
}
