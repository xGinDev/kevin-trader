"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { FormField, helperId } from "@/components/form-field";
import { RiskDisclaimer } from "@/components/risk-disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculator } from "@/content";
import { duration, ease } from "@/lib/motion";
import { calculateRisk, type Market, type RiskField, type RiskResult, type RiskValues } from "@/lib/risk";
import { cn } from "@/lib/utils";

const markets: { value: Market; label: string }[] = [
  { value: "forex", label: "Forex" },
  { value: "acciones", label: "Acciones" },
  { value: "indices", label: "Índices y cripto" },
];

const fields: { name: RiskField; label: string; placeholder: string; helper?: string }[] = [
  { name: "capital", label: "Capital de la cuenta (USD)", placeholder: "Ej.: 5.000" },
  { name: "risk", label: "Riesgo por operación (%)", placeholder: "Ej.: 1", helper: calculator.riskHelper },
  { name: "entry", label: "Precio de entrada", placeholder: "Ej.: 1,0850" },
  { name: "stop", label: "Stop loss", placeholder: "Ej.: 1,0820" },
];

const emptyValues: RiskValues = { capital: "", risk: "", entry: "", stop: "" };

/**
 * CUSTOM 1/3 · construida con Input, Tabs, Button y Alert de shadcn; la lógica es propia.
 * Se recalcula en cada cambio (sin botón "Calcular").
 */
export function RiskCalculator() {
  const [market, setMarket] = useState<Market>("forex");
  const [values, setValues] = useState<RiskValues>(emptyValues);
  const result = useMemo(() => calculateRisk(market, values, calculator.maxRiskPercent), [market, values]);
  const errors = result.status === "error" ? result.errors : {};
  const baseId = useId();

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 lg:p-8">
      <Tabs value={market} onValueChange={(value) => setMarket(value as Market)} className="gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-h3 text-foreground">{calculator.title}</h3>
            <p className="text-body-sm text-muted-foreground">{calculator.description}</p>
          </div>
          <TabsList aria-label="Mercado">
            {markets.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {markets.map((item) => (
          <TabsContent key={item.value} value={item.value} className="text-base">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:w-[520px] lg:shrink-0">
                {fields.map((field) => {
                  const id = `${baseId}-${field.name}`;
                  const error = errors[field.name];
                  return (
                    <FormField key={field.name} id={id} label={field.label} helper={field.helper} error={error}>
                      <Input
                        id={id}
                        name={field.name}
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder={field.placeholder}
                        value={values[field.name]}
                        onChange={(event) => setValues((prev) => ({ ...prev, [field.name]: event.target.value }))}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error || field.helper ? helperId(id) : undefined}
                        className="tabular-nums"
                      />
                    </FormField>
                  );
                })}
              </div>
              <ResultPanel result={result} />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <RiskDisclaimer />
    </div>
  );
}

function ResultPanel({ result }: { result: RiskResult }) {
  const hasResult = result.status === "result";

  async function copy() {
    if (!hasResult) return;
    const text = [
      `Tamaño de posición: ${result.position}`,
      result.detail,
      `Monto en riesgo: ${result.riskAmount}`,
      `Distancia al stop: ${result.distance}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Resultado copiado");
    } catch {
      toast.error("No se pudo copiar. Selecciona el texto y cópialo a mano.");
    }
  }

  const message =
    result.status === "empty"
      ? "Completa los cuatro campos y el resultado aparece aquí."
      : result.status === "error"
        ? result.message
        : result.summary;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-[10px] bg-muted p-6">
      <p className="text-label-sm text-muted-foreground">Tamaño de posición</p>
      <div className="flex flex-col gap-4">
        <p
          className={cn(
            "font-mono text-[36px] leading-[47px] font-medium tabular-nums",
            hasResult ? "text-primary" : "text-muted-foreground",
          )}
        >
          <Swap value={hasResult ? result.position : "—"} />
        </p>
        {hasResult && (
          <p className="text-body-sm text-muted-foreground">
            <Swap value={result.detail} />
          </p>
        )}
      </div>
      <Separator />
      <dl className="flex flex-col gap-4">
        <ResultLine label="Monto en riesgo" value={hasResult ? result.riskAmount : "—"} highlight={hasResult} />
        <ResultLine label="Distancia al stop" value={hasResult ? result.distance : "—"} highlight={hasResult} />
      </dl>
      <p className="text-body-sm text-muted-foreground" aria-live="polite">
        {message}
      </p>
      {hasResult && (
        <Button type="button" variant="ghost" className="self-start" onClick={copy}>
          Copiar resultado
        </Button>
      )}
    </div>
  );
}

function ResultLine({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-body-sm text-muted-foreground">{label}</dt>
      <dd className={cn("text-data whitespace-nowrap", highlight ? "text-foreground" : "text-muted-foreground")}>
        <Swap value={value} />
      </dd>
    </div>
  );
}

/** El número cambia con crossfade (150 ms, y 4→0). No cuenta ni rueda: debe sentirse inmediato. */
function Swap({ value }: { value: string }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        className="inline-block"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : duration.press, ease }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}
