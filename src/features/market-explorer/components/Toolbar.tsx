import { SearchInput } from "@/components/shared/SearchInput";
import { Filters } from "./Filters";
import { ColumnVisibilityMenu } from "./ColumnVisibilityMenu";
import type { ColumnKey } from "../types/marketExplorer.types";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  categoryLabel: string;
  onCategoryChange: (label: string, categoryId: string | null) => void;
  categoryDisabled?: boolean;
  visibleColumns: Set<ColumnKey>;
  onToggleColumn: (key: ColumnKey) => void;
}

export function Toolbar({
  search,
  onSearchChange,
  categoryLabel,
  onCategoryChange,
  categoryDisabled,
  visibleColumns,
  onToggleColumn,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchInput
        placeholder="Search coins..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-xl"
        aria-label="Search coins"
      />
      <div className="flex items-center gap-4 ml-auto">
        <Filters
          categoryLabel={categoryLabel}
          onCategoryChange={onCategoryChange}
          disabled={categoryDisabled}
        />
        <ColumnVisibilityMenu
          visibleColumns={visibleColumns}
          onToggle={onToggleColumn}
        />
      </div>
    </div>
  );
}
