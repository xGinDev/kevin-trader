import { Shield } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { disclaimer } from "@/content";
import { cn } from "@/lib/utils";

type RiskDisclaimerProps = {
  /** Compact va bajo la calculadora y en el formulario. Full va en el footer. */
  variant?: "compact" | "full";
  className?: string;
};

export function RiskDisclaimer({ variant = "compact", className }: RiskDisclaimerProps) {
  const full = variant === "full";
  return (
    <Alert
      role="note"
      className={cn(
        "flex items-start gap-3.5 rounded-lg border-border bg-muted text-body-sm",
        full ? "p-6" : "p-4",
        className,
      )}
    >
      <Shield className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <div className="flex flex-col gap-1.5">
        {full && <AlertTitle className="text-label text-foreground">{disclaimer.fullTitle}</AlertTitle>}
        <AlertDescription className="text-body-sm text-pretty text-muted-foreground">
          {full ? disclaimer.full : disclaimer.compact}
        </AlertDescription>
      </div>
    </Alert>
  );
}
