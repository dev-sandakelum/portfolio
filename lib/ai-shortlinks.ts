import rawLinks from "./ai-links.json";

export type AiLink = {
  code: string;
  label: string;
  subtitle?: string;
  icon?: string;
  destinationUrl: string;
};

const links = rawLinks as AiLink[];

export function getAiLinks(): AiLink[] {
  return links;
}

export function getAiLinkByCode(code: string): AiLink | undefined {
  return links.find((l) => l.code === code);
}

export function getAiLinkCategories(): Record<string, AiLink[]> {
  return links.reduce<Record<string, AiLink[]>>((acc, link) => {
    const category = link.code.split("/")[0] ?? "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {});
}
