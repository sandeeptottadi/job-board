import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NodeHtmlMarkdown } from "node-html-markdown";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { url } = await req.json();
    const html = await getJobPage(url);
    if (!html) {
      return NextResponse.json(
        { error: "Failed to fetch job page" },
        { status: 500 }
      );
    }
    const markdown = NodeHtmlMarkdown.translate(html);
    const data = await processMarkDown(markdown);
    return NextResponse.json(data);
  }
  return NextResponse.json(
    { error: `Method ${req.method} Not Allowed` },
    { status: 405 }
  );
}

async function processMarkDown(markdown: string) {
  const prompt = `Extract useful information from the job description: ${markdown}. Extract info and give me an object with the following properties - job_title, company_name, application_link to apply for the role, location, description (summarized description should contain all the important points), salary_range which should have min, max and currency properties , location_type which should strictly fall into one of these [Remote, In-person, Hybrid], employment_type which should be one of these [Full Time, Part Time, Internship, Contract / Temporary], an array of skills and an array of requirements and link of the company_logo. Should strictly be an object with the above properties without extract data. Please don't include extra text to the output`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    temperature: 0,
  });
  const content = completion.choices[0].message.content;
  let data = null;
  if (content) {
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}") + 1;
    const jsonString = content.substring(jsonStart, jsonEnd);
    data = JSON.parse(jsonString);
  }

  return {
    job_title: data?.job_title,
    company_name: data?.company_name,
    application_link: data?.application_link,
    location: data?.location,
    description: data?.description,
    salary_range: data?.salary_range,
    location_type: data?.location_type,
    employment_type: data?.employment_type,
    skills: data?.skills,
    requirements: data?.requirements,
    company_logo: data?.company_logo,
  };
}

async function getJobPage(url: string) {
  try {
    const response = await axios.get(url);
    if (response.statusText !== "OK") {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    return null;
  }
}
