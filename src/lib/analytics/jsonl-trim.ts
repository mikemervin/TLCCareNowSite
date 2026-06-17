/** Keep the newest lines when a JSONL store exceeds a byte budget. */
export function trimJsonlToMaxBytes(raw: string, maxBytes: number): string {
  const trimmed = raw.trimEnd();
  if (!trimmed || trimmed.length <= maxBytes) {
    return trimmed ? `${trimmed}\n` : "";
  }

  let lines = trimmed.split("\n");
  while (lines.length > 1 && lines.join("\n").length + 1 > maxBytes) {
    lines = lines.slice(-Math.max(1, Math.floor(lines.length * 0.75)));
  }

  return `${lines.join("\n")}\n`;
}
