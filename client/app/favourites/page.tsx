import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import getFavourites from "@/lib/getFavourites";

export default async function FavouritesPage() {
  const properties = await getFavourites();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 inline-block"
      >
        &larr; Back to listings
      </Link>

      <h1 className="text-2xl font-medium text-gray-900 mb-6">My favourites</h1>

      {properties.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-gray-500 mb-3">You haven&apos;t saved any properties yet.</p>
          <Link
            href="/"
            className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse listings
          </Link>
        </div>
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
