import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoriesList } from "../hooks/useCategoriesList";
import { CATEGORY_OPTIONS } from "../constants";

interface FiltersProps {
  categoryLabel: string;
  onCategoryChange: (label: string, categoryId: string | null) => void;
  disabled?: boolean;
}

export function Filters({
  categoryLabel,
  onCategoryChange,
  disabled,
}: FiltersProps) {
  const { data: categories } = useCategoriesList();

  function resolveCategoryId(match: string | null): string | null {
    if (!match || !categories) return null;
    return (
      categories.find((c) => c.name.toLowerCase().includes(match.toLowerCase()))
        ?.category_id ?? null
    );
  }

  return (
    <Select
      value={categoryLabel}
      disabled={disabled}
      onValueChange={(label) => {
        const option = CATEGORY_OPTIONS.find((o) => o.label === label);
        onCategoryChange(
          label || "All",
          resolveCategoryId(option?.match ?? null),
        );
      }}
    >
      <SelectTrigger className="w-32" aria-label="Filter by category">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORY_OPTIONS.map((option) => (
          <SelectItem key={option.label} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
