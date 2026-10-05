const cache = new Map<string, Intl.NumberFormat>();

/** Intl.NumberFormat("es-CO") con caché por opciones. */
export function formatNumber(value: number, options: Intl.NumberFormatOptions = {}) {
  const key = JSON.stringify(options);
  let formatter = cache.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat("es-CO", options);
    cache.set(key, formatter);
  }
  return formatter.format(value);
}

/**
 * Lee un número escrito en formato es-CO ("10.000", "1,0850").
 * Si hay coma, es el separador decimal y los puntos son de miles.
 * Sin coma, `dotIsThousands` decide si el punto agrupa miles (capital)
 * o es decimal (precios escritos como 1.0850).
 */
export function parseLocaleNumber(raw: string, { dotIsThousands = false } = {}) {
  const value = raw.trim().replace(/\s/g, "");
  if (value === "") return null;

  let normalized: string;
  if (value.includes(",")) {
    normalized = value.replace(/\./g, "").replace(",", ".");
  } else if (dotIsThousands || (value.match(/\./g)?.length ?? 0) > 1) {
    normalized = value.replace(/\./g, "");
  } else {
    normalized = value;
  }

  // Acepta "1." o "1," a mitad de escritura.
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(normalized)) return Number.NaN;
  return Number(normalized);
}
