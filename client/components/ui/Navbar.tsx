"use client";

import { useState } from "react";
import Link from "next/link";
import AuthNav from "../AuthNav";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-base font-medium text-gray-900">
          Basibasau
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/property/new"
            className="text-sm px-4 py-1.5 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            + Add property
          </Link>
          <AuthNav />
        </div>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden flex flex-col gap-1 p-2 rounded-lg border border-gray-200"
          aria-label="Toggle menu"
        >
          <span className="block w-4 h-px bg-gray-900" />
          <span className="block w-4 h-px bg-gray-900" />
          <span className="block w-4 h-px bg-gray-900" />
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 px-4 py-3 flex flex-col gap-2">
          <Link
            href="/property/new"
            onClick={() => setMenuOpen(false)}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors text-center"
          >
            + Add property
          </Link>
          <AuthNav />
        </div>
      )}
    </nav>
  );
}
