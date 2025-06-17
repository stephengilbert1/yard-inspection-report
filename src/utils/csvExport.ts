import type { Transformer } from "@/types";

export function convertToCSV(data: Transformer[]): string {
  if (!data.length) return "";

  const keys = Object.keys(data[0]);
  const header = keys.join(",");
  const rows = data.map((row) =>
    keys.map((k) => JSON.stringify((row as any)[k] ?? "")).join(",")
  );
  return [header, ...rows].join("\n");
}

export function downloadCSV(csv: string, filename = "transformers.csv") {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
