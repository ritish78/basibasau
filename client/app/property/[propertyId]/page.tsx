import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import getProperty from "@/lib/getProperty";

export default async function PropertyPage({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;

  const property = await getProperty(propertyId);

  if (!property) return notFound();

  const formattedPrice = Number(property.price).toLocaleString();
  const priceLabel = property.sale ? `$${formattedPrice}` : `$${formattedPrice}/mo`;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 inline-block"
      >
        &larr; Back to listings
      </Link>

      <div className="relative h-[500] bg-gray-100 rounded-xl overflow-hidden mb-6">
        {property.imageUrl?.[0] ? (
          <Image src={property.imageUrl[0]} alt={property.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                property.sale ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {property.sale ? "For sale" : "For rent"}
            </span>
            <span className="text-xs text-gray-500">{property.address}</span>
          </div>

          <h1 className="text-2xl font-medium text-gray-900 mb-3">{property.title}</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{property.description}</p>

          <div className="flex gap-4 text-sm text-gray-400 pt-4 border-t border-gray-100">
            <span>♡ {property.likes} likes</span>
            <span>👁 {property.views + 1} views</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 self-start">
          <p className="text-2xl font-medium text-gray-900 mb-4">{priceLabel}</p>
          <LikeButton propertyId={property.id} likes={property.likes} />
          <button className="w-full mt-2 py-2.5 text-sm border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors">
            Contact seller
          </button>
        </div>
      </div>
    </main>
  );
}
