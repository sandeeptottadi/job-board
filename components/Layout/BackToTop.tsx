"use client";

import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);

return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        onClick={scrollTop}
        style={{
          display: showScroll ? "block" : "none",
        }}
        className="bg-primary-color text-white fixed right-0 bottom-[30px] cursor-pointer w-[40px] h-[35px] rounded-l-full text-center leading-[35px] text-[20px] z-50 hover:bg-[#000]"
      >
        <i className="ri-arrow-up-line"></i>
      </div>
    </>
  );
};

export default BackToTop;
