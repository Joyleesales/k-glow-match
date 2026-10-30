// Editorial demo preferences, not clinical rules or age-based skin assessments.
export const agePreferences = {
  "20s": {
    priority: ["serum", "essence", "deep", "cream", "eye"],
    description: "Glow serum and lightweight hydration first.",
  },
  "30s": {
    priority: ["eye", "essence", "serum", "cream", "deep"],
    description: "Eye care and hydration first.",
  },
  "40s": {
    priority: ["cream", "eye", "essence", "deep", "serum"],
    description: "Moisture cream and eye care first.",
  },
  "50s+": {
    priority: ["cream", "essence", "eye", "serum", "deep"],
    description: "A moisture-focused ritual first.",
  },
};

export function refineRecommendations(items, ageRange) {
  const preference = agePreferences[ageRange];
  if (!preference) return items;
  const rank = (id) => {
    const index = preference.priority.indexOf(id);
    return index === -1 ? preference.priority.length : index;
  };
  return [...items].sort((a, b) => rank(a.id) - rank(b.id));
}
