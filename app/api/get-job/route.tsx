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
  const prompt = `Extract the following information from the job description: ${markdown}. The output should be a strictly formatted JSON object with these properties: 
{
  "job_title": "string",
  "company_name": "string",
  "application_link": "string",
  "location": "string",
  "description": "string", // Summarized description containing all important points
  "salary_range": {
    "min": number,
    "max": number,
    "currency": "string"
  },
  "location_type": "Remote" | "In-person" | "Hybrid",
  "employment_type": "Full Time" | "Part Time" | "Internship" | "Contract / Temporary",
  "skills": ["string"], // Array of required skills
  "requirements": ["string"], // Array of role requirements
  "company_logo": "string", // Link to the company's logo
  "posted_date": "string", // Date the job was posted
  "application_deadline": "string", // Last date to apply for the role
  "experience_level": "Entry-level" | "Mid-level" | "Senior-level", // Experience required
  "education_requirements": "string", // Minimum education qualification
  "benefits": ["string"], // Array of additional perks
  "work_authorization": "string", // Visa or permit requirements
  "job_id": "string", // Unique identifier for the job posting
  "job_category": "string", // Industry or domain of the job
  "work_environment": "On-site" | "Hybrid" | "Remote", // Type of work environment
  "company_size": "string", // Number of employees or size description
  "company_website": "string" // Link to the company’s website
}
Ensure the output strictly matches this format without adding any extra text or details.`;

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
    try {
      const jsonStart = content.indexOf("{");
      const jsonEnd = content.lastIndexOf("}") + 1;
      let jsonString = content.substring(jsonStart, jsonEnd);
      data = JSON.parse(jsonString);
    } catch (error) {
      console.error("JSON parsing error:", error);
    }
  }

  return {
    job_title: data?.job_title || null,
    company_name: data?.company_name || null,
    application_link: data?.application_link || null,
    location: data?.location || null,
    description: data?.description || null,
    salary_range: data?.salary_range || null,
    location_type: data?.location_type || null,
    employment_type: data?.employment_type || null,
    skills: data?.skills || null,
    requirements: data?.requirements || null,
    company_logo: data?.company_logo || null,
    posted_date: data?.posted_date || null,
    application_deadline: data?.application_deadline || null,
    experience_level: data?.experience_level || null,
    education_requirements: data?.education_requirements || null,
    benefits: data?.benefits || null,
    work_authorization: data?.work_authorization || null,
    job_id: data?.job_id || null,
    job_category: data?.job_category || null,
    work_environment: data?.work_environment || null,
    company_size: data?.company_size || null,
    company_website: data?.company_website || null,
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
