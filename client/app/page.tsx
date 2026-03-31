import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property.types";

async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch("http://localhost:5000/api/v1/property", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.properties;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const properties = await getProperties();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium text-gray-900 mb-6">Properties</h1>

      {properties.length === 0 ? (
        <p className="text-sm text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  );
}
