"use client";
import React, { Suspense } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthProvider from "./AuthProvider";

// Initialize Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

// Loading component with animation
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-4 border-purple-500 border-solid rounded-full animate-spin animate-ping opacity-50"></div>
        </div>
        {/* Animated Loading Text */}
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConvexProvider client={convex}>
        <AuthProvider>{children}</AuthProvider>
      </ConvexProvider>
    </Suspense>
  );
}

export default Provider;