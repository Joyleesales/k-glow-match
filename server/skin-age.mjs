// Read an explicit vendor age only. Never infer age from concern/UI scores.
export function readSkinAge(result) {
  const output = result?.output;
  const ageEntry = Array.isArray(output)
    ? output.find(item => item?.type === 'skin_age')
    : null;
  const candidates = [
    result?.skin_age,
    result?.score_info?.skin_age,
    !Array.isArray(output) ? output?.skin_age : undefined,
    ageEntry?.skin_age,
    ageEntry?.score,
    ageEntry?.value,
    ageEntry?.age,
  ];
  return candidates.find(value => typeof value === 'number' && Number.isFinite(value) && value >= 0) ?? null;
}
