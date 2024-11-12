"use client";

import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { MultiValue, ActionMeta } from "react-select";
import schedulerCustomStyles from "./dropdownCustomStyles";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  employmentTypeOptions,
  locationTypeOptions,
  locationOptions,
  experienceOptions,
  experienceMap,
  employmentTypeMap,
  locationTypeMap,
} from "./options";

export default function Dropdowns() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [jobTitle, setJobTitle] = useState<{ value: string; label: string }[]>(
    []
  );
  const [location, setLocation] = useState<{ value: string; label: string }[]>(
    []
  );
  const [keyword, setKeyword] = useState<{ value: string; label: string }[]>(
    []
  );
  const [hideKeyword, setHideKeyword] = useState<
    { value: string; label: string }[]
  >([]);
  const [experienceLevel, setExperienceLevel] = useState<
    { value: string; label: string }[]
  >([]);
  const [jobType, setJobType] = useState<{ value: string; label: string }[]>(
    []
  );
  const [locationType, setLocationType] = useState<
    { value: string; label: string }[]
  >([]);
  const [salary, setSalary] = useState<{ value: string; label: string }[]>([]);

  const changeJobTitle = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("jobTitle", Array.from(newValue));
    setJobTitle([...newValue]);
  };
  const changeLocation = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("location", Array.from(newValue));
    setLocation([...newValue]);
  };
  const changeKeyword = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("keyword", Array.from(newValue));
    setKeyword([...newValue]);
  };
  const changeHideKeyword = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("hideKeyword", Array.from(newValue));
    setHideKeyword([...newValue]);
  };
  const changeExperienceLevel = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("experienceLevel", Array.from(newValue));
    setExperienceLevel([...newValue]);
  };
  const changeJobType = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("employmentType", Array.from(newValue));
    setJobType([...newValue]);
  };
  const changeLocationType = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("locationType", Array.from(newValue));
    setLocationType([...newValue]);
  };
  const changeSalary = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setQuery("salary", Array.from(newValue));
    setSalary([...newValue]);
  };

  useEffect(() => {
    const jobTitle = query?.get("jobTitle");
    const location = query?.get("location");
    const keyword = query?.get("keyword");
    const hideKeyword = query?.get("hideKeyword");
    const experienceLevel = query?.get("experienceLevel");
    const jobType = query?.get("employmentType");
    const locationType = query?.get("locationType");
    const salary = query?.get("salary");

    setJobTitle(
      jobTitle
        ? jobTitle.split(",").map((title) => ({ value: title, label: title }))
        : []
    );
    setLocation(
      location
        ? location.split(",").map((loc) => ({ value: loc, label: loc }))
        : []
    );
    setKeyword(
      keyword
        ? keyword.split(",").map((key) => ({ value: key, label: key }))
        : []
    );
    setHideKeyword(
      hideKeyword
        ? hideKeyword.split(",").map((key) => ({ value: key, label: key }))
        : []
    );
    setExperienceLevel(
      experienceLevel
        ? experienceLevel.split(",").map((level) => ({
            value: level,
            label: experienceMap[level as keyof typeof experienceMap],
          }))
        : []
    );

    setJobType(
      jobType
        ? jobType.split(",").map((type) => ({
            value: type,
            label: employmentTypeMap[type as keyof typeof employmentTypeMap],
          }))
        : []
    );
    setLocationType(
      locationType
        ? locationType.split(",").map((type) => ({
            value: type,
            label: locationTypeMap[type as keyof typeof locationTypeMap],
          }))
        : []
    );
    setSalary(
      salary ? salary.split(",").map((sal) => ({ value: sal, label: sal })) : []
    );
  }, [query]);

  const setQuery = (
    key: string,
    selectedOptions: { value: string; label: string }[]
  ) => {
    const params = new URLSearchParams(query?.toString());
    params.delete(key);
    params.delete("page");
    if (selectedOptions && selectedOptions.length > 0) {
      let searchParam = "";
      selectedOptions.forEach((option) => {
        searchParam += option.value + ",";
      });
      searchParam = searchParam.slice(0, -1);
      params.append(key, searchParam);
      params.append("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="m-auto flex w-[95%] flex-row flex-wrap justify-center gap-8">
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Job Title"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        options={[]}
        value={jobTitle}
        onChange={changeJobTitle}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Location"
        isMulti
        value={location}
        formatCreateLabel={(val) => '"' + val + '"'}
        options={locationOptions}
        onChange={changeLocation}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Keywords"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        options={[]}
        value={keyword}
        onChange={changeKeyword}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Hide Keywords"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        value={hideKeyword}
        options={[]}
        onChange={changeHideKeyword}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Experience Level"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        value={experienceLevel}
        options={experienceOptions}
        onChange={changeExperienceLevel}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Job Type"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        value={jobType}
        options={employmentTypeOptions}
        onChange={changeJobType}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Location Type"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        value={locationType}
        options={locationTypeOptions}
        onChange={changeLocationType}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
      <CreatableSelect
        className=" min-w-[200px] max-w-full"
        getOptionLabel={(option) => `${option.label}`}
        placeholder="Salary"
        isMulti
        formatCreateLabel={(val) => '"' + val + '"'}
        value={salary}
        options={[]}
        onChange={changeSalary}
        classNamePrefix="react-select"
        styles={schedulerCustomStyles}
      />
    </div>
  );
}
