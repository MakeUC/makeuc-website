export function parseTracks(applicableTracks: unknown): string[] {
  if (!applicableTracks) return [];
  if (Array.isArray(applicableTracks)) {
    return applicableTracks.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
  }
  if (typeof applicableTracks === "string") {
    try {
      const parsed = JSON.parse(applicableTracks);
      if (Array.isArray(parsed)) {
        return parsed.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
      }
    } catch {
      // not JSON, parse as comma-separated
    }
    return applicableTracks
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }
  return [];
}

export function getTrackBadgeStyle(track: string): string {
  const t = track.toLowerCase();
  if (t.includes("green")) {
    return "border-emerald-500/50 bg-emerald-950/40 text-emerald-300";
  }
  if (t.includes("security")) {
    return "border-cyan-500/50 bg-cyan-950/40 text-cyan-300";
  }
  if (t.includes("edu")) {
    return "border-blue-500/50 bg-blue-950/40 text-blue-300";
  }
  if (t.includes("social")) {
    return "border-purple-500/50 bg-purple-950/40 text-purple-300";
  }
  if (t.includes("hard")) {
    return "border-amber-500/50 bg-amber-950/40 text-amber-300";
  }
  return "border-primary/40 bg-background-inset text-primary";
}
