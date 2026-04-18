export type UnitCategory = "volume" | "mass";

export type UnitDefinition = {
  label: string;
  category: UnitCategory;
  toBaseUnit: number;
};

export const unitDefinitions: Record<string, UnitDefinition> = {
  l: { label: "liter", category: "volume", toBaseUnit: 1000 },
  ml: { label: "ml", category: "volume", toBaseUnit: 1 },
  tsp: { label: "tsp", category: "volume", toBaseUnit: 4.92892 },
  tbsp: { label: "tbsp", category: "volume", toBaseUnit: 14.7868 },
  cups: { label: "cups", category: "volume", toBaseUnit: 236.588 },
  fl_oz: { label: "fl oz", category: "volume", toBaseUnit: 29.5735 },
  pt: { label: "pints", category: "volume", toBaseUnit: 473.176 },
  qt: { label: "quarts", category: "volume", toBaseUnit: 946.353 },
  gal: { label: "gal", category: "volume", toBaseUnit: 3785.41 },
  kg: { label: "kg", category: "mass", toBaseUnit: 1000 },
  g: { label: "grams", category: "mass", toBaseUnit: 1 },
  lb: { label: "lbs", category: "mass", toBaseUnit: 453.592 },
  oz: { label: "oz", category: "mass", toBaseUnit: 28.3495 },
};

export function convertUnit(value: number, from: string, to: string): number {
  const fromUnit = unitDefinitions[from];
  const toUnit = unitDefinitions[to];

  if (!fromUnit || !toUnit) {
    throw new Error("Unknown unit");
  }

  if (fromUnit.category !== toUnit.category) {
    throw new Error("Incompatible units");
  }

  return (value * fromUnit.toBaseUnit) / toUnit.toBaseUnit;
}
