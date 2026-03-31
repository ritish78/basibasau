import { Property } from "@/types/property.types";
import { BACKEND_API_BASE_URL } from "./constants";

export default async function getProperty(propertyId: string): Promise<Property | null> {
  try {
    const res = await fetch(`${BACKEND_API_BASE_URL}/property/${propertyId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}
