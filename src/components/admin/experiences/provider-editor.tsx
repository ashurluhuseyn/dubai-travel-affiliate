"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

import { FormField } from "@/components/admin/experiences/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ExperienceProviderInput } from "@/lib/cms/validation/experience";
import { emptyProviderInput } from "@/lib/cms/utils/experience-form-mapper";

type ProviderEditorProps = {
  providers: ExperienceProviderInput[];
  onChange: (providers: ExperienceProviderInput[]) => void;
  fieldErrors: Record<string, string>;
};

function fieldError(
  fieldErrors: Record<string, string>,
  index: number,
  key: keyof ExperienceProviderInput
) {
  return fieldErrors[`providers.${index}.${key}`];
}

export function ProviderEditor({
  providers,
  onChange,
  fieldErrors,
}: ProviderEditorProps) {
  const updateProvider = (
    index: number,
    patch: Partial<ExperienceProviderInput>
  ) => {
    onChange(
      providers.map((provider, i) =>
        i === index ? { ...provider, ...patch } : provider
      )
    );
  };

  const addProvider = () => {
    onChange([...providers, emptyProviderInput(providers.length)]);
  };

  const removeProvider = (index: number) => {
    onChange(
      providers
        .filter((_, i) => i !== index)
        .map((provider, i) => ({ ...provider, display_order: i }))
    );
  };

  const moveProvider = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= providers.length) return;
    const next = [...providers];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next.map((provider, i) => ({ ...provider, display_order: i })));
  };

  return (
    <div className="space-y-4">
      {providers.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No affiliate providers yet. Add at least one booking option.
        </p>
      )}

      {providers.map((provider, index) => (
        <div
          key={`provider-${index}`}
          className="rounded-lg border border-border/60 bg-luxury-black/10 p-4"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="font-heading text-base text-foreground">
              Provider {index + 1}
            </h3>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => moveProvider(index, -1)}
                disabled={index === 0}
                aria-label="Move provider up"
              >
                <ChevronUp className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => moveProvider(index, 1)}
                disabled={index === providers.length - 1}
                aria-label="Move provider down"
              >
                <ChevronDown className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => removeProvider(index)}
                aria-label="Remove provider"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Provider name"
              htmlFor={`provider-name-${index}`}
              error={fieldError(fieldErrors, index, "provider_name")}
            >
              <Input
                id={`provider-name-${index}`}
                value={provider.provider_name}
                onChange={(e) =>
                  updateProvider(index, { provider_name: e.target.value })
                }
              />
            </FormField>
            <FormField
              label="Affiliate URL"
              htmlFor={`provider-url-${index}`}
              error={fieldError(fieldErrors, index, "affiliate_url")}
            >
              <Input
                id={`provider-url-${index}`}
                type="url"
                value={provider.affiliate_url}
                onChange={(e) =>
                  updateProvider(index, { affiliate_url: e.target.value })
                }
              />
            </FormField>
            <FormField
              label="Price"
              htmlFor={`provider-price-${index}`}
              error={fieldError(fieldErrors, index, "price")}
            >
              <Input
                id={`provider-price-${index}`}
                type="number"
                min={0}
                step="0.01"
                value={provider.price}
                onChange={(e) =>
                  updateProvider(index, {
                    price: e.target.value === "" ? 0 : Number(e.target.value),
                  })
                }
              />
            </FormField>
            <FormField
              label="Currency"
              htmlFor={`provider-currency-${index}`}
              error={fieldError(fieldErrors, index, "currency")}
            >
              <Input
                id={`provider-currency-${index}`}
                value={provider.currency}
                onChange={(e) =>
                  updateProvider(index, { currency: e.target.value })
                }
              />
            </FormField>
            <FormField
              label="Rating"
              htmlFor={`provider-rating-${index}`}
              error={fieldError(fieldErrors, index, "rating")}
            >
              <Input
                id={`provider-rating-${index}`}
                type="number"
                min={0}
                max={5}
                step="0.1"
                value={provider.rating ?? ""}
                onChange={(e) =>
                  updateProvider(index, {
                    rating:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </FormField>
            <FormField
              label="Review count"
              htmlFor={`provider-reviews-${index}`}
              error={fieldError(fieldErrors, index, "review_count")}
            >
              <Input
                id={`provider-reviews-${index}`}
                type="number"
                min={0}
                value={provider.review_count ?? ""}
                onChange={(e) =>
                  updateProvider(index, {
                    review_count:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
              />
            </FormField>
            <FormField
              label="Badge"
              htmlFor={`provider-badge-${index}`}
              error={fieldError(fieldErrors, index, "badge")}
            >
              <Input
                id={`provider-badge-${index}`}
                value={provider.badge ?? ""}
                onChange={(e) =>
                  updateProvider(index, { badge: e.target.value })
                }
              />
            </FormField>
            <FormField
              label="Cancellation text"
              htmlFor={`provider-cancel-${index}`}
              error={fieldError(fieldErrors, index, "cancellation_text")}
            >
              <Input
                id={`provider-cancel-${index}`}
                value={provider.cancellation_text ?? ""}
                onChange={(e) =>
                  updateProvider(index, { cancellation_text: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="mt-4">
            <FormField
              label="Description"
              htmlFor={`provider-desc-${index}`}
              error={fieldError(fieldErrors, index, "description")}
            >
              <Input
                id={`provider-desc-${index}`}
                value={provider.description ?? ""}
                onChange={(e) =>
                  updateProvider(index, { description: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={provider.is_recommended}
                onChange={(e) =>
                  updateProvider(index, { is_recommended: e.target.checked })
                }
              />
              Recommended
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={provider.instant_confirmation}
                onChange={(e) =>
                  updateProvider(index, {
                    instant_confirmation: e.target.checked,
                  })
                }
              />
              Instant confirmation
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={provider.mobile_ticket}
                onChange={(e) =>
                  updateProvider(index, { mobile_ticket: e.target.checked })
                }
              />
              Mobile ticket
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={provider.is_active}
                onChange={(e) =>
                  updateProvider(index, { is_active: e.target.checked })
                }
              />
              Active
            </label>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={addProvider}>
        <Plus className="size-4" />
        Add provider
      </Button>
    </div>
  );
}
