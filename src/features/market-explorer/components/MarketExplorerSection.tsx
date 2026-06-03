import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ErrorState } from "@/components/shared/ErrorState";
import { TableSkeleton } from "@/components/shared/LoadingSkeleton";
import { Pagination } from "@/components/shared/Pagination";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useMarketExplorerBrowse } from "../hooks/useMarketExplorerBrowse";
import { useMarketExplorerSearch } from "../hooks/useMarketExplorerSearch";
import { Toolbar } from "./Toolbar";
import { MarketTable } from "./MarketTable";
import { sortCoins, paginate } from "../utils/marketExplorerTransforms";
import {
  type ColumnKey,
  type SortKey,
  type SortDirection,
} from "../types/marketExplorer.types";
import { SEARCH_PAGE_SIZE, BROWSE_PAGE_SIZE, COLUMN_DEFS } from "../constants";
import { Section } from "@/components/layout/Section";

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = COLUMN_DEFS.filter(
  (c) => c.defaultVisible,
).map((c) => c.key);

export function MarketExplorerSection() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const isSearchMode = debouncedSearch.trim().length > 1;

  const [categoryLabel, setCategoryLabel] = useState("All");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<Set<ColumnKey>>(
    new Set(DEFAULT_VISIBLE_COLUMNS),
  );

  // Browse mode uses server side pagination, while search mode uses client side pagination.

  // Get the query for browsing.
  const browseQuery = useMarketExplorerBrowse(
    categoryId,
    page,
    sortKey,
    sortDirection,
  );
  // Get the query for searchinbg.
  const searchQuery = useMarketExplorerSearch(debouncedSearch);
  // Determine which query to use based on the debounced search input.
  const activeQuery = isSearchMode ? searchQuery : browseQuery;

  // Sort the search results based on the current sort key and direction.
  const searchProcessedData = useMemo(() => {
    if (!isSearchMode || !searchQuery.data) return [];
    return sortCoins(searchQuery.data, sortKey, sortDirection);
  }, [isSearchMode, searchQuery.data, sortKey, sortDirection]);

  // Get the total number of pages for search results based on the page size.
  const searchTotalPages = Math.max(
    1,
    Math.ceil(searchProcessedData.length / SEARCH_PAGE_SIZE),
  );

  // Paginate the search results based on the current page and page size.
  const searchPageItems = useMemo(
    () => paginate(searchProcessedData, page, SEARCH_PAGE_SIZE),
    [searchProcessedData, page],
  );

  const coins = isSearchMode ? searchPageItems : (browseQuery.data ?? []);

  // Determine if there is a next page for pagination in browse mode.
  // If the backend API serves data in batches (pages) of 20 items at a time,
  // seeing a length of exactly 20 implies:
  // "We have received a full page of data, which means there is likely a next page available to fetch."
  // If it returns less than 20, it means you have hit the end of the database.
  const hasNextPage =
    !isSearchMode && (browseQuery.data?.length ?? 0) === BROWSE_PAGE_SIZE;

  function handleSort(key: SortKey) {
    // Whenever the user clicks on the same sort key, toggle the sort direction.
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      // Whenever the user switches to a new sort key,
      // reset to "desc" order except for "rank" which defaults to "asc".
      setSortKey(key);
      setSortDirection(key === "rank" ? "asc" : "desc");
    }
    setPage(1);
  }

  function handleToggleColumn(key: ColumnKey) {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleCategoryChange(label: string, id: string | null) {
    setCategoryLabel(label);
    setCategoryId(id);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <Section>
      <div className="flex flex-col gap-4 p-5">
        <SectionHeading>
          <SectionHeading.Title>Market Data Explorer</SectionHeading.Title>
        </SectionHeading>

        <Toolbar
          search={search}
          onSearchChange={handleSearchChange}
          categoryLabel={categoryLabel}
          onCategoryChange={handleCategoryChange}
          categoryDisabled={isSearchMode}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
        />
      </div>

      {activeQuery.isPending && <TableSkeleton rows={10} cols={6} />}

      {activeQuery.isError && (
        <div className="p-5">
          <ErrorState
            message="Failed to load market data."
            onRetry={activeQuery.refetch}
          />
        </div>
      )}

      {activeQuery.data && (
        <>
          <MarketTable
            coins={coins}
            visibleColumns={visibleColumns}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />

          <div className="flex items-center justify-between px-5 py-4">
            <p className="text-sm text-muted-foreground">
              {isSearchMode
                ? `Showing ${searchProcessedData.length === 0 ? 0 : (page - 1) * SEARCH_PAGE_SIZE + 1}–${Math.min(page * SEARCH_PAGE_SIZE, searchProcessedData.length)} of ${searchProcessedData.length}`
                : `Page ${page}`}
            </p>
            <Pagination
              page={page}
              totalPages={isSearchMode ? searchTotalPages : undefined}
              hasNextPage={isSearchMode ? undefined : hasNextPage}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </Section>
  );
}
