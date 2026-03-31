import { Property } from "@/types/property.types";

export default async function getProperty(propertyId: string): Promise<Property | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/property/${propertyId}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}
