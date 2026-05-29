import { useEffect, useRef, useState } from "react";
import { CoinIcon } from "@/components/shared/CoinIcon";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCoinSearch } from "../hooks/useCoinSearch";
import { useUIStore } from "@/store/useUIStore";
import { SearchInput } from "@/components/shared/SearchInput";

export function CoinSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebouncedValue(query);
  const setSelectedCoinId = useUIStore((s) => s.setSelectedCoinId);

  const shouldSearch = debouncedQuery.trim().length > 1;
  // Search for coins based on the debounced query.
  // Check for "enabled" key inside useCoinSearch - checks length of debouncedQuery before making the API call.
  const { data: results, isFetching } = useCoinSearch(debouncedQuery);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(coinId: string, coinName: string) {
    setSelectedCoinId(coinId);
    setQuery(coinName);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <SearchInput
        role="combobox"
        aria-expanded={isOpen && shouldSearch}
        aria-controls="coin-search-results"
        aria-autocomplete="list"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search cryptocurrency..."
      />

      {isOpen && shouldSearch && (
        <ul
          id="coin-search-results"
          role="listbox"
          className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-border bg-popover shadow-md"
        >
          {isFetching && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              Searching…
            </li>
          )}
          {!isFetching && results?.length === 0 && (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No coins found.
            </li>
          )}
          {!isFetching &&
            results?.map((coin) => (
              <li key={coin.id} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => handleSelect(coin.id, coin.name)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent focus:bg-accent focus:outline-none"
                >
                  <CoinIcon src={coin.thumb} alt={coin.name} size={20} />
                  <span className="font-medium text-foreground">
                    {coin.name}
                  </span>
                  <span className="text-xs uppercase text-muted-foreground">
                    {coin.symbol}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
