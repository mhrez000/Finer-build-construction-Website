import { useEffect, useState } from "react";

/**
 * useSheetProjects
 * ------------------------------------------------------------------
 * Fetches project data from a published Google Sheet and returns it
 * in the format the CoverflowCarousel expects.
 *
 * Google Sheets "Publish to web" exposes the sheet as a JSON feed at:
 * https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:json
 *
 * The sheet must have these column headers in Row 1:
 *   A: title       — project name (e.g. "Deck & Pergola")
 *   B: category    — project category (e.g. "Outdoor Living")
 *   C: description — project description text
 *   D: images      — comma-separated image URLs or filenames
 *
 * If images are just filenames (e.g. "IMG_001.jpg, IMG_002.jpg"),
 * they are prefixed with the BASE_URL + "projects/{folder}/" path.
 * If they start with "http", they are used as-is.
 */

export interface SheetProject {
  title: string;
  category: string;
  description: string;
  images: string[];
}

// ⬇️ REPLACE THIS with the real spreadsheet ID once the owner creates it
const SHEET_ID = "PASTE_SHEET_ID_HERE";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Hardcoded fallback data — used when sheet isn't connected yet or fails to load
const FALLBACK_PROJECTS: SheetProject[] = (() => {
  const B = import.meta.env.BASE_URL;
  return [
    {
      title: "Deck & Pergola",
      category: "Outdoor Living",
      description: "Custom hardwood decks and structural pergolas built across Melbourne — premium materials, precision joinery, designed for the Australian climate.",
      images: [
        `${B}projects/deck/IMG_0412.jpg`,
        `${B}projects/deck/IMG_0563.jpg`,
        `${B}projects/deck/IMG_0570.jpg`,
        `${B}projects/deck/IMG_1842.jpg`,
        `${B}projects/deck/IMG_2239.jpg`,
        `${B}projects/deck/IMG_2521.jpg`,
        `${B}projects/deck/IMG_9710.jpg`,
        `${B}projects/deck/IMG_9747.jpg`,
      ],
    },
    {
      title: "Renovation",
      category: "Renovation",
      description: "Full interior renovations and structural updates — blending heritage character with modern luxury through careful framing, joinery, and finishing.",
      images: [
        `${B}projects/renovation/IMG_3376.jpg`,
        `${B}projects/renovation/IMG_3381.jpg`,
        `${B}projects/renovation/IMG_3421.jpg`,
        `${B}projects/renovation/IMG_3798.jpg`,
        `${B}projects/renovation/IMG_3799.jpg`,
        `${B}projects/renovation/IMG_4302.jpg`,
        `${B}projects/renovation/IMG_4304.jpg`,
        `${B}projects/renovation/0b955fc1-5235-4ee2-9402-7d91d0ad5377.jpg`,
        `${B}projects/renovation/6efc76da-2f95-4d23-9e3d-576362db9df5.jpg`,
        `${B}projects/renovation/F90E2B8B-C1D8-429E-A24C-773CB2C6D2F6.jpg`,
        `${B}projects/renovation/a27e338d-e945-4938-83a7-e92ac338536b.jpg`,
        `${B}projects/renovation/a97f17bf-ecd2-4135-a308-b4c05171ff04.jpg`,
      ],
    },
    {
      title: "New Build",
      category: "New Build",
      description: "Custom stick-framed family homes featuring complex architectural rooflines, exposed structural beams, and extensive bespoke joinery throughout.",
      images: [
        `${B}projects/new-build/Finer Build.jpg`,
        `${B}projects/new-build/Finer Build(2).jpg`,
        `${B}projects/new-build/Finer Build(7).jpg`,
      ],
    },
    {
      title: "New Home",
      category: "New Home",
      description: "Modern residential homes designed and framed by Finer Build — every stud, joist, and roof line crafted to architectural precision.",
      images: [
        `${B}projects/new-home/New Home.jpg`,
        `${B}projects/new-home/New Home(1).jpg`,
        `${B}projects/new-home/New Home(2).jpg`,
        `${B}projects/new-home/New Home(3).jpg`,
      ],
    },
  ];
})();

function parseSheetResponse(text: string): SheetProject[] {
  try {
    // Google Sheets JSON response is wrapped in: google.visualization.Query.setResponse({...})
    // Strip that wrapper to get raw JSON
    const jsonStr = text
      .replace(/^.*google\.visualization\.Query\.setResponse\(/, "")
      .replace(/\);?\s*$/, "");

    const data = JSON.parse(jsonStr);
    const rows = data?.table?.rows;

    if (!rows || rows.length === 0) return [];

    const B = import.meta.env.BASE_URL;

    return rows
      .map((row: { c: ({ v: string | null } | null)[] }) => {
        const cells = row.c || [];
        const title = cells[0]?.v?.trim() || "";
        const category = cells[1]?.v?.trim() || "";
        const description = cells[2]?.v?.trim() || "";
        const imagesRaw = cells[3]?.v?.trim() || "";

        if (!title) return null;

        // Parse images: comma-separated, each can be a full URL or a filename
        const images = imagesRaw
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((img: string) => {
            if (img.startsWith("http://") || img.startsWith("https://")) {
              return img;
            }
            // Assume it's a local file in public/projects/
            return `${B}${img}`;
          });

        return { title, category, description, images } as SheetProject;
      })
      .filter(Boolean) as SheetProject[];
  } catch (err) {
    console.error("Failed to parse Google Sheet data:", err);
    return [];
  }
}

export function useSheetProjects(): {
  projects: SheetProject[];
  loading: boolean;
  isUsingSheet: boolean;
} {
  const [projects, setProjects] = useState<SheetProject[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [isUsingSheet, setIsUsingSheet] = useState(false);

  useEffect(() => {
    // Don't fetch if sheet ID hasn't been set
    if (SHEET_ID === "PASTE_SHEET_ID_HERE") {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchProjects() {
      try {
        const res = await fetch(SHEET_URL);
        if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);

        const text = await res.text();
        const parsed = parseSheetResponse(text);

        if (!cancelled && parsed.length > 0) {
          setProjects(parsed);
          setIsUsingSheet(true);
        }
      } catch (err) {
        console.warn("Google Sheet fetch failed, using fallback data:", err);
        // Fallback data already set as initial state
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProjects();
    return () => { cancelled = true; };
  }, []);

  return { projects, loading, isUsingSheet };
}
