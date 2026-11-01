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

export const routineSteps = [
  { number: 1, label: "Toner" },
  { number: 2, label: "Serum" },
  { number: 3, label: "Cream" },
  { number: 4, label: "Sunscreen" },
];

// Keep the existing catalog intact: essence is not a toner, and makeup is
// separate from the skincare routine. Scores never determine display order.
export function routinePosition(product) {
  const type = product.type.toLowerCase();
  if (type.includes("toner")) return { order: 1, label: "1 Toner" };
  if (type.includes("essence")) return { order: 1.5, label: "Essence · before serum" };
  if (type.includes("serum")) return { order: 2, label: "2 Serum" };
  if (type.includes("sunscreen")) return { order: 4, label: "4 Sunscreen" };
  if (type.includes("cream")) return { order: 3, label: "3 Cream" };
  return { order: 5, label: "Makeup" };
}

export function inRoutineOrder(items) {
  return [...items].sort((a, b) => routinePosition(a).order - routinePosition(b).order);
}
