"use client";

import { startTransition, useActionState, useEffect, useId, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Controller, useForm } from "react-hook-form";

import { sendContact, type ContactState } from "@/app/actions";
import { FormField, helperId, labelId } from "@/components/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contact, experienceLevels, interestOptions, whatsappHref, type InterestValue } from "@/content";
import { PRESELECT_INTEREST_EVENT } from "@/lib/contact-events";
import { contactSchema, type ContactField, type ContactInput } from "@/lib/contact-schema";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const defaultValues: ContactInput = {
  name: "",
  contact: "",
  level: "",
  interest: "",
  message: "",
  website: "",
};

/**
 * Estados: idle → validation error (onBlur) → sending (botón en loading, campos atenuados)
 * → sent (crossfade a la confirmación) o send error (Alert arriba, datos conservados).
 */
export function ContactForm() {
  const [state, dispatch, pending] = useActionState<ContactState, ContactInput>(sendContact, { status: "idle" });
  // "Enviar otro mensaje" vuelve a un formulario en blanco aunque el último estado sea "sent".
  const [writingAnother, setWritingAnother] = useState(false);
  const reduced = useReducedMotion();

  function submit(values: ContactInput) {
    setWritingAnother(false);
    startTransition(() => dispatch(values));
  }

  // Solo se reemplaza el formulario si el envío salió bien; con error los datos se conservan.
  const sent = state.status === "sent" && !pending && !writingAnother ? state : null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 lg:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <Success
            key="sent"
            firstName={sent.firstName}
            channel={sent.channel}
            onReset={() => setWritingAnother(true)}
          />
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, transition: { duration: reduced ? duration.reduced : duration.exit } }}
          >
            <Form state={state} pending={pending} onSubmit={submit} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FormProps = {
  state: ContactState;
  pending: boolean;
  onSubmit: (values: ContactInput) => void;
};

function Form({ state, pending, onSubmit }: FormProps) {
  const id = useId();
  const reduced = useReducedMotion();
  const alertRef = useRef<HTMLDivElement>(null);
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const sendFailed = state.status === "error" && !pending;

  // Errores que solo detecta el servidor.
  useEffect(() => {
    if (state.status !== "invalid") return;
    for (const [field, message] of Object.entries(state.fieldErrors)) {
      setError(field as ContactField, { message }, { shouldFocus: true });
    }
  }, [state, setError]);

  // Si falla el envío, el Alert recibe el foco.
  useEffect(() => {
    if (sendFailed) alertRef.current?.focus();
  }, [sendFailed]);

  // ServiceCard → preselecciona el servicio.
  useEffect(() => {
    function handle(event: Event) {
      const interest = (event as CustomEvent<InterestValue>).detail;
      setValue("interest", interest, { shouldDirty: true });
    }
    window.addEventListener(PRESELECT_INTEREST_EVENT, handle);
    return () => window.removeEventListener(PRESELECT_INTEREST_EVENT, handle);
  }, [setValue]);

  const fieldId = (name: ContactField) => `${id}-${name}`;
  const describedBy = (name: ContactField, hasHelper = false) =>
    errors[name] || hasHelper ? helperId(fieldId(name)) : undefined;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h3 text-foreground">Escríbeme</h3>
        <p className="text-body-sm text-muted-foreground">Te respondo en {contact.responseTime}.</p>
      </div>

      <AnimatePresence initial={false}>
        {sendFailed && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? duration.reduced : duration.error, ease }}
          >
            <Alert
              ref={alertRef}
              tabIndex={-1}
              className="flex items-start gap-3 rounded-md border-destructive bg-muted p-3.5 outline-none focus-visible:ring-3 focus-visible:ring-ring"
            >
              <CircleAlert className="size-5 shrink-0 text-destructive" aria-hidden />
              <AlertDescription className="text-body-sm text-foreground">
                No pudimos enviar tu mensaje. Tus datos siguen aquí: revisa tu conexión e inténtalo de nuevo, o{" "}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-foreground">
                  escríbeme por WhatsApp
                </a>
                .
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <fieldset disabled={pending} className="flex flex-col gap-5 transition-opacity duration-150 disabled:opacity-60">
        <FormField id={fieldId("name")} label="Nombre" error={errors.name?.message}>
          <Input
            id={fieldId("name")}
            autoComplete="name"
            placeholder="Cómo te llamo"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
        </FormField>

        <FormField
          id={fieldId("contact")}
          label="Email o WhatsApp"
          helper="Lo uso solo para responderte."
          error={errors.contact?.message}
        >
          <Input
            id={fieldId("contact")}
            autoComplete="email"
            inputMode="email"
            placeholder="tu@correo.com"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={describedBy("contact", true)}
            {...register("contact")}
          />
        </FormField>

        <FormField id={fieldId("level")} label="Tu experiencia" error={errors.level?.message} asGroup>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <RadioGroup
                ref={field.ref}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) field.onBlur();
                }}
                aria-labelledby={labelId(fieldId("level"))}
                aria-invalid={errors.level ? true : undefined}
                aria-describedby={describedBy("level")}
                className="gap-2"
              >
                {experienceLevels.map((level) => (
                  <RadioOption key={level.value} value={level.value} label={level.label} invalid={!!errors.level} />
                ))}
              </RadioGroup>
            )}
          />
        </FormField>

        <FormField id={fieldId("interest")} label="¿Qué te interesa?" error={errors.interest?.message}>
          <Controller
            control={control}
            name="interest"
            render={({ field }) => (
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={(open) => {
                  if (!open) field.onBlur();
                }}
              >
                <SelectTrigger
                  ref={field.ref}
                  id={fieldId("interest")}
                  className="w-full"
                  aria-invalid={errors.interest ? true : undefined}
                  aria-describedby={describedBy("interest")}
                >
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {interestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          id={fieldId("message")}
          label="Mensaje"
          helper="Opcional, pero me ayuda a preparar la llamada."
          error={errors.message?.message}
        >
          <Textarea
            id={fieldId("message")}
            rows={4}
            placeholder="Cuéntame en qué punto estás y qué te gustaría lograr."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", true)}
            className="resize-none"
            {...register("message")}
          />
        </FormField>

        {/* Honeypot fuera de la vista y del orden de tabulación */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            No llenar
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </div>
      </fieldset>

      <Button type="submit" className="w-full" loading={pending}>
        {pending ? "Enviando…" : sendFailed ? "Intentar de nuevo" : "Enviar mensaje"}
      </Button>
      <p className="text-body-sm text-muted-foreground">
        Uso tus datos solo para responderte. No los comparto con nadie.
      </p>
    </form>
  );
}

/** Figma · RadioOption: la fila completa es clicable. */
function RadioOption({ value, label, invalid }: { value: string; label: string; invalid: boolean }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md border bg-background px-3.5 py-3 text-body text-foreground transition-colors duration-150 hover:bg-accent has-focus-visible:ring-3 has-focus-visible:ring-ring has-data-checked:border-primary",
        invalid ? "border-destructive" : "border-input",
      )}
    >
      <RadioGroupItem value={value} className="focus-visible:ring-0" />
      {label}
    </label>
  );
}

type SuccessProps = {
  firstName: string;
  channel: "email" | "whatsapp";
  onReset: () => void;
};

/** Crossfade + scale .98→1 en 200 ms; el foco pasa al título y se anuncia con aria-live. */
function Success({ firstName, channel, onReset }: SuccessProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const where = channel === "email" ? "al correo que dejaste" : "por WhatsApp al número que dejaste";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? duration.reduced : duration.enter, ease }}
      aria-live="polite"
      className="flex flex-col gap-4 py-6"
    >
      <CircleCheck className="size-10 text-primary" strokeWidth={1.75} aria-hidden />
      <h3 ref={titleRef} tabIndex={-1} className="text-h3 text-foreground outline-none">
        Mensaje enviado
      </h3>
      <p className="text-body text-muted-foreground">
        Gracias, {firstName}. Te respondo en {contact.responseTime} {where}. Si es urgente, escríbeme por WhatsApp.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </Button>
        <Button type="button" variant="ghost" onClick={onReset}>
          Enviar otro mensaje
        </Button>
      </div>
    </motion.div>
  );
}
