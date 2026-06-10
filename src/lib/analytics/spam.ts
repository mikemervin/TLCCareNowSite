export function isLikelySpamText(
  ...parts: Array<string | null | undefined>
): boolean {
  const text = parts.filter(Boolean).join(" ").toLowerCase();
  return (
    /advertising platform|reach real buyers|traffic estimates|jmailservice|searching for your service|we\.qo\.k\.u/i.test(
      text,
    ) || /\.qo\./.test(text)
  );
}
