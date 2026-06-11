import links from "./links.json";

export type Shortlink = {
  code: string;
  label: string;
  destinationUrl: string;
};

export function getShortlinks(): Shortlink[] {
  return links;
}

export function getShortlinkByCode(code: string): Shortlink | undefined {
  return links.find((link) => link.code === code);
}
