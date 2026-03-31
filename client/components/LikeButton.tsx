"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { BACKEND_API_BASE_URL } from "@/lib/constants";

export default function LikeButton({ propertyId, likes }: { propertyId: string; likes: number }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkLiked = async () => {
      try {
        const res = await fetch(`${BACKEND_API_BASE_URL}/property/${propertyId}/liked`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setLiked(data.liked);
        }
      } catch {
        console.error("Could not check like status");
      }
    };

    checkLiked();
  }, [isAuthenticated, propertyId]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/property/${propertyId}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/property/${propertyId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setLiked((prev) => !prev);
        setCount((prev) => (liked ? prev - 1 : prev + 1));
      }
    } catch {
      console.error("Like failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`w-full py-2.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 ${
        liked
          ? "bg-gray-100 text-gray-900 border border-gray-200"
          : "bg-gray-900 text-white hover:bg-gray-800"
      }`}
    >
      {liked ? `♡ Saved (${count})` : `♡ Save property`}
    </button>
  );
}
