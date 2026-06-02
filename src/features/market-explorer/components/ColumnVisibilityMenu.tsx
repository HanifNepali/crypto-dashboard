import { Columns3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnKey } from "../types/marketExplorer.types";
import { COLUMN_DEFS } from "../constants";

interface ColumnVisibilityMenuProps {
  visibleColumns: Set<ColumnKey>;
  onToggle: (key: ColumnKey) => void;
}

export function ColumnVisibilityMenu({
  visibleColumns,
  onToggle,
}: ColumnVisibilityMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm" className="h-9.5">
          <Columns3 className="mr-1 h-4 w-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {COLUMN_DEFS.filter((col) => col.toggleable).map((col) => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={visibleColumns.has(col.key)}
            onCheckedChange={() => onToggle(col.key)}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
