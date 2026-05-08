import { Parser } from "json2csv";

export function generateCsv(data: Record<string, unknown>[]) {
  const parser = new Parser();
  return parser.parse(data);
}

export function generatePdfPlaceholder(title: string, lines: string[]) {
  return [title, "", ...lines].join("\n");
}
