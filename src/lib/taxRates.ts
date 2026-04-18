// lib/taxRates.ts
const TAX_RATES: Record<string, number> = {
  TX: 0.0825,
  AR: 0.05125,
  OK: 0.05,
};

export function getTaxRate(
  state: "TX" | "OK" | "AR",
  taxExempt: boolean,
): number {
  if (taxExempt) return 0;
  return TAX_RATES[state] ?? 0; // 0 si el estado no está en la lista
}
