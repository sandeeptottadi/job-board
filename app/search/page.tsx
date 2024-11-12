import Dropdowns from "@/components/filters/Dropdowns";
import JobsList from "@/components/Jobs/JobsList";
import Layout from "@/components/Layout";
import React, { Suspense } from "react";

export const metadata = {
  title: "Search Page",
  description: "Search for jobs using various filters",
};

export default function index() {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Dropdowns />
        <JobsList />
      </Suspense>
    </Layout>
  );
}
