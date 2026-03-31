"use client";

import { BACKEND_API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewPropertyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sale, setSale] = useState(true);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageUrlChange = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const filteredImageUrls = imageUrls.filter((url) => url.trim() !== "");

      const response = await fetch(`${BACKEND_API_BASE_URL}/property/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          sale,
          address,
          price,
          imageUrl: filteredImageUrls,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? "Failed to add property.");
      }

      setTitle("");
      setDescription("");
      setSale(true);
      setAddress("");
      setPrice("");
      setImageUrls([""]);

      router.push(`/property/${data.property[0].id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error occurred while adding the property!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-lg text-gray-900">
        <h1 className="text-2xl font-medium mb-1">Add a new listing</h1>
        <p className="text-sm text-gray-500 mb-6">Fill in the details below to publish your property</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Spacious 3BHK in Lalitpur"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property — size, amenities, nearby landmarks..."
              required
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Listing type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSale(true)}
                className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                  sale
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                For Sale
              </button>
              <button
                type="button"
                onClick={() => setSale(false)}
                className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                  !sale
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                For Rent
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Pulchowk, Lalitpur, Nepal"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">
              Price <span className="text-gray-400">(numbers only, e.g. 4500000)</span>
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="4500000"
              required
              min={0}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1.5">Image URLs</label>
            <div className="space-y-2">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageUrlField(index)}
                      className="px-3 py-2 text-sm text-gray-400 border border-gray-200 rounded-lg hover:text-red-500 hover:border-red-200 transition-colors"
                      aria-label="Remove image URL"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addImageUrlField}
              className="mt-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              + Add another image
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publishing listing..." : "Publish listing"}
            <span
              className="inline-block ml-1 size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
