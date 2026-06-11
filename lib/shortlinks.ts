import rawLinks from "./links.json";

export type Shortlink = {
  code: string;
  label: string;
  destinationUrl: string;
  icon?: string;
  subtitle?: string;
  hidden?: boolean;
};

const links = rawLinks as Shortlink[];

export function getShortlinks(): Shortlink[] {
  return links;
}

export function getPublicShortlinks(): Shortlink[] {
  return links.filter((l) => !l.hidden && !l.code.startsWith("h/"));
}

export function getShortlinkByCode(code: string): Shortlink | undefined {
  return links.find((link) => link.code === code);
}
