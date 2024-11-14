"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import JobsListSkeleton from "./JobsListSkeleton";
import {
  employmentTypeOptionsMap,
  locationTypeOptionsMap,
} from "../filters/options";

export default function JobsList() {
  interface Job {
    id: number;
    created_at: string;
    job_title: string;
    company_name: string;
    application_link: string;
    location: string | null;
    description: string;
    company_logo: string | null;
    company_slug: string;
    job_slug: string;
    job_board: string;
    industry: string | null;
    about_company: string | null;
    linkedin_link: string | null;
    company_website: string | null;
    salary_range: {
      max: string;
      min: string;
      currency: string;
    } | null;
    location_type: string | null;
    employment_type: string | null;
    skills: string[];
    requirements: string[];
    expired: boolean;
    years_of_experience: number | null;
    min: number | null;
    max: number | null;
  }

  interface JobList {
    title: string;
    description: string;
    link: string;
  }

  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [jobLinks, setJobLinks] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [noOfJobs, setNoOfJobs] = useState(0);
  const [sortBy, setSortBy] = useState("date-added");
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (query?.get("sortBy")) {
      setSortBy(query.get("sortBy") || "date-added");
    }
  }, [query]);

  const setQuery = (key: string, value: string) => {
    const params = new URLSearchParams(query?.toString());
    params.delete(key);
    params.append(key, value);
    router.push(`${pathname}?${params.toString()}`);
    return `${pathname}?${params.toString()}`;
  };

  const getLink = (key: string, value: string) => {
    const params = new URLSearchParams(query?.toString());
    let link = `${pathname}?${params.toString()}`;
    if (query?.get(key)) {
      const params = new URLSearchParams(query?.toString());
      const existingValues = params.get(key)?.split(",") || [];
      if (!existingValues.includes(value)) {
        existingValues.push(value);
        params.set(key, existingValues.join(","));
      }
      link = `${pathname}?${params.toString()}`;
    } else {
      link = link + `&${key}=${value}`;
    }
    return link;
  };

  useEffect(() => {
    setJobs([]);
    setAllLoaded(false);
    let latestAbortController = new AbortController();
    const signal = latestAbortController.signal;
    fetch("/api/search-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_title: query?.get("jobTitle")
          ? query?.get("jobTitle")?.split(",")
          : [],
        keywords: [
          ...[query?.get("location")?.split(",") || []],
          ...(query?.get("keyword")?.split(",") || []),
          ...(query?.get("hideKeyword")?.split(",") || []),
          ...(query?.get("experienceLevel")?.split(",") || []),
          ...(query?.get("employmentType")?.split(",") || []),
          ...(query?.get("locationType")?.split(",") || []),
          ...(query?.get("salary") ? [query.get("salary") as string] : []),
        ],
      }),
      signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (signal.aborted) return;
        const links: string[] = [];
        data?.jobs?.map((jobList: JobList) => {
          links.push(jobList.link);
        });
        setJobLinks(links);
      })
      .catch((e) => {
        if (signal.aborted) return;
        console.error(e);
      });
    return () => {
      latestAbortController.abort();
    };
  }, [query]);

  useEffect(() => {
    setJobs([]);
    const fetchJobs = async () => {
      setAllLoaded(false);
      await Promise.all(
        jobLinks.map((jobLink, idx) => {
          return fetch("/api/get-job", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: jobLink }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.error) setJobs((prevJobs) => [...prevJobs, data]);
            })
            .catch((e) => {
              console.error(e);
            });
        })
      );
      setAllLoaded(true);
    };

    fetchJobs();
  }, [jobLinks]);

  return (
    <div className=" mt-16">
      {jobs.length > 0 && (
        <div className=" flex w-full flex-col gap-5">
          {jobs.map((job) => (
            <a
              href={job.application_link}
              className=" relative m-auto h-fit w-3/4 rounded-xl border border-[#EEEEEE] bg-[#FFFFFF] p-10"
              key={job.id}
            >
              <div className="absolute right-8 top-10">
                <div className=" mt-2">{job.location}</div>
              </div>

              <div className="flex flex-row">
                <div className=" bg-black-100 mr-4 flex h-[50px] w-[50px] items-center justify-center rounded-full">
                  {job.company_logo && (
                    <img
                      className="rounded-full object-contain"
                      src={job.company_logo}
                      alt={job.company_name}
                      width={50}
                      height={50}
                    />
                  )}
                  {!job.company_logo && (
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                      <p>{job.company_name && ""}</p>
                    </div>
                  )}
                </div>
                <h2 className="line-clamp-1 h-fit w-3/4 overflow -hidden text-ellipsis text-xl">
                  {job.job_title}
                </h2>
              </div>
              <div style={{ marginLeft: "66px" }} className="flex flex-col">
                <p>{job.company_name}</p>
                {job.about_company && (
                  <p className="mt-2 line-clamp-2 overflow-hidden text-ellipsis">
                    {" "}
                    <b>About Company: </b>
                    {job.about_company}
                  </p>
                )}
                <div className=" mt-4 flex flex-row flex-wrap gap-2">
                  {job.company_website && (
                    <a
                      href={job.company_website}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-[#F3F4F6] px-2 py-2 text-center font-semibold text-black hover:bg-gray-200"
                    >
                      Website
                    </a>
                  )}
                  {job.linkedin_link && (
                    <a
                      href={job.linkedin_link}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md bg-[#F3F4F6] px-2 py-2 text-center font-semibold text-black hover:bg-gray-200"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
                <div className=" mt-4 flex flex-row flex-wrap gap-2">
                  {job.salary_range &&
                  job.salary_range.min &&
                  job.salary_range.max &&
                  job.salary_range.min !== "Not specified" &&
                  job.salary_range.max !== "Not specified" ? (
                    <span className=" rounded-md bg-[#F3F4F6] px-2 py-1">
                      {job.salary_range.min} - {job.salary_range.max}{" "}
                      {job.salary_range.currency}
                    </span>
                  ) : (
                    <></>
                  )}
                  {job.years_of_experience !== null &&
                    job.years_of_experience >= 0 && (
                      <a
                        href={getLink(
                          "experienceLevel",
                          job.years_of_experience <= 2
                            ? "entry-level"
                            : job.years_of_experience <= 5
                            ? "junior-level"
                            : job.years_of_experience <= 10
                            ? "mid-level"
                            : "senior-level"
                        )}
                        className=" rounded-md bg-[#F3F4F6] px-2 py-1"
                      >
                        {job.years_of_experience <= 2
                          ? "Entry Level"
                          : job.years_of_experience <= 5
                          ? "Junior Level"
                          : job.years_of_experience <= 10
                          ? "Mid Level"
                          : "Senior Level"}{" "}
                        ({job.years_of_experience} years)
                      </a>
                    )}
                  {job.employment_type && (
                    <a
                      href={getLink(
                        "employmentType",
                        employmentTypeOptionsMap[
                          job.employment_type as keyof typeof employmentTypeOptionsMap
                        ]
                      )}
                      className=" rounded-md bg-[#F3F4F6] px-2 py-1"
                    >
                      {job.employment_type}
                    </a>
                  )}
                  {job.location_type && (
                    <a
                      href={getLink(
                        "locationType",
                        locationTypeOptionsMap[
                          job.location_type as keyof typeof locationTypeOptionsMap
                        ]
                      )}
                      className=" cursor-pointer rounded-md bg-[#F3F4F6] px-2 py-1"
                    >
                      {job.location_type}
                    </a>
                  )}
                </div>
                <div className="mt-4 flex flex-row flex-wrap gap-2">
                  {job?.skills?.map((skill) => (
                    <span
                      key={skill}
                      className=" rounded-md bg-[#F3F4F6] px-2 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      {!allLoaded &&
        Array.from({ length: 10 - jobs.length }).map((_, index) => {
          return <JobsListSkeleton key={index} />;
        })}
      <button className="mt-10 mb-10 bg-blue-500 text-white px-4 py-2 rounded mx-auto block hover:bg-blue-600">
        Next Page
      </button>
    </div>
  );
}
