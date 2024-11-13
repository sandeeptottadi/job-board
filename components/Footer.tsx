import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
        </p>
        <div className="flex justify-center mt-2">
          <a href="/privacy" className="mx-2 hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="mx-2 hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="mx-2 hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
