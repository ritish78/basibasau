import { Property } from "@/types/property.types";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({ property }: { property: Property }) {
  const formattedPrice = Number(property.price).toLocaleString();
  const priceLabel = property.sale ? `$${formattedPrice}` : `$${formattedPrice}/mo`;

  return (
    <Link href={`/property/${property.id}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
        {/* Image */}
        <div className="h-48 bg-gray-100 overflow-hidden relative">
          {property.imageUrl?.[0] ? (
            <Image
              src={property.imageUrl[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                property.sale ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {property.sale ? "For sale" : "For rent"}
            </span>
            <span className="text-sm font-medium text-gray-900">{priceLabel}</span>
          </div>

          <p className="text-sm font-medium text-gray-900 truncate mb-1">{property.title}</p>
          <p className="text-xs text-gray-500 truncate mb-3">{property.address}</p>

          <div className="flex gap-3 text-xs text-gray-400 border-t border-gray-100 pt-3">
            <span>♡ {property.likes}</span>
            <span>👁 {property.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
