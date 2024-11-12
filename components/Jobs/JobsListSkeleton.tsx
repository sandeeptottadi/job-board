import React from "react";
import "./jobSkeleton.css";

export default function JobsListSkeleton() {
  return (
    <div className="m-auto w-3/4">
      <div className="skeleton-container">
        <div className="company-logo-skeleton"></div>
        <div className="content-container-skeleton">
          <div className="company-title-skeleton"></div>
          <div className="items1-skeleton">
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="about-skeleton"></div>
          <div className="about-line1-skeleton"></div>
          <div className="about-line2-skeleton"></div>
          <div className="requirement-skeleton"></div>
          <div className="requirement-line1-skeleton"></div>
          <div className="requirement-line1-skeleton"></div>
          <div className="requirement-line2-skeleton"></div>
          <div className="items1-skeleton">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="items2-skeleton">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
          <div className="items1-skeleton">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
