import React from "react";

export default function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="font-bold text-xl text-primary-color">
              Job Portal
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
