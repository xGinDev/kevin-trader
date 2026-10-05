import { formatNumber, parseLocaleNumber } from "@/lib/format";

// Figma · RiskCalculator:
// riesgo = capital × %; distancia = |entrada − stop|; unidades = riesgo / distancia; lotes = unidades / 100.000.
// Validación: campos > 0, stop ≠ entrada, riesgo ≤ 10 %.

export type Market = "forex" | "acciones" | "indices";
export type RiskField = "capital" | "risk" | "entry" | "stop";
export type RiskValues = Record<RiskField, string>;

const STANDARD_LOT = 100_000;
const PIP = 0.0001; // Par cotizado en USD (EUR/USD, GBP/USD…)

const fieldName: Record<RiskField, string> = {
  capital: "el capital",
  risk: "el riesgo",
  entry: "el precio de entrada",
  stop: "el stop",
};

export type RiskResult =
  | { status: "empty" }
  | { status: "error"; errors: Partial<Record<RiskField, string>>; message: string }
  | {
      status: "result";
      position: string;
      detail: string;
      riskAmount: string;
      distance: string;
      summary: string;
    };

const usd = (value: number) =>
  `USD ${formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function validate(values: RiskValues, maxRiskPercent: number) {
  const capital = parseLocaleNumber(values.capital, { dotIsThousands: true });
  const risk = parseLocaleNumber(values.risk);
  const entry = parseLocaleNumber(values.entry);
  const stop = parseLocaleNumber(values.stop);
  const errors: Partial<Record<RiskField, string>> = {};

  if (capital !== null && !(capital > 0)) errors.capital = "Ingresa un capital mayor que 0.";
  if (risk !== null && !(risk > 0)) errors.risk = "Ingresa un riesgo mayor que 0 %.";
  else if (risk !== null && risk > maxRiskPercent)
    errors.risk = `Usa como máximo ${formatNumber(maxRiskPercent)} %. Lo recomendado es entre 0,5 % y 1 %.`;
  if (entry !== null && !(entry > 0)) errors.entry = "Ingresa un precio mayor que 0.";
  if (stop !== null && !(stop > 0)) errors.stop = "Ingresa un stop mayor que 0.";
  else if (stop !== null && entry !== null && entry > 0 && stop === entry)
    errors.stop = "El stop tiene que ser distinto del precio de entrada.";

  return { capital, risk, entry, stop, errors };
}

export function calculateRisk(market: Market, values: RiskValues, maxRiskPercent: number): RiskResult {
  const { capital, risk, entry, stop, errors } = validate(values, maxRiskPercent);

  const firstError = (Object.keys(errors) as RiskField[])[0];
  if (firstError) {
    return { status: "error", errors, message: `Corrige ${fieldName[firstError]} para ver el resultado.` };
  }
  if (capital === null || risk === null || entry === null || stop === null) {
    return { status: "empty" };
  }

  const riskAmount = (capital * risk) / 100;
  const distance = Math.abs(entry - stop);
  const units = riskAmount / distance;
  const summary = `Si el precio toca tu stop, pierdes ${usd(riskAmount)}: el ${formatNumber(risk, { maximumFractionDigits: 2 })} % de tu cuenta.`;

  if (market === "forex") {
    return {
      status: "result",
      position: `${formatNumber(units / STANDARD_LOT, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} lotes`,
      detail: `${formatNumber(Math.round(units))} unidades del par`,
      riskAmount: usd(riskAmount),
      distance: `${formatNumber(distance / PIP, { maximumFractionDigits: 1 })} pips`,
      summary,
    };
  }

  if (market === "acciones") {
    const shares = Math.floor(units);
    return {
      status: "result",
      position: `${formatNumber(shares)} ${shares === 1 ? "acción" : "acciones"}`,
      detail: `Posición de ${usd(shares * entry)}`,
      riskAmount: usd(riskAmount),
      distance: `${usd(distance)} por acción`,
      summary,
    };
  }

  return {
    status: "result",
    position: `${formatNumber(units, { maximumFractionDigits: 2 })} unidades`,
    detail: "Unidades o contratos del instrumento",
    riskAmount: usd(riskAmount),
    distance: `${formatNumber(distance, { maximumFractionDigits: 2 })} puntos`,
    summary,
  };
}
