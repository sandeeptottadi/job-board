import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const cx = process.env.GOOGLE_CX;
const apiKey = process.env.GOOGLE_API_KEY;

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body = await req.json();
    const job_title = Array.isArray(body.job_title) ? body.job_title : [];
    const keywords = Array.isArray(body.keywords) ? body.keywords : [];
    const query = `${job_title.join(" OR ")} ${keywords.join(
      " OR "
    )} site:greenhouse.io OR site:welfound.com OR site:lever.co OR site:workatastartup.com`;
    const jobs = [];
    try {
      const results = await googleSearch(query, 1);
      if (results) {
        for (const result of results) {
          jobs.push(result);
        }
      }
    } catch (error) {
      console.error("Error processing job board:", error);
    }
    return NextResponse.json({ jobs });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function googleSearch(query: string, numPages: number) {
  const results: Array<{ title: string; link: string; description: string }> =
    [];
  for (let i = 0; i < numPages; i++) {
    const startIndex = i * 10 + 1;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&cx=${cx}&key=${apiKey}&start=${startIndex}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.items) {
        data.items.forEach((item: any) => {
          results.push({
            title: item.title,
            link: item.link,
            description: item.snippet,
          });
        });
      } else {
        break;
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      break;
    }
  }
  return results;
}
