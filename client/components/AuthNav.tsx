"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNav() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <div className="w-20 h-8 rounded-lg bg-gray-100 animate-pulse" />;

  if (!isAuthenticated || !user) {
    return (
      <Link
        href={`/login?redirect=${encodeURIComponent(pathname)}`}
        className="text-sm px-4 py-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-medium flex items-center justify-center">
          {getInitials(user.firstName, user.lastName)}
        </div>
        <span className="text-sm font-medium hidden md:inline-block">{user.firstName}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-sm py-1 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setDropdownOpen(false);
            }}
            className="w-full text-left text-sm px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
