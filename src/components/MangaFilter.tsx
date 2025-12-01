import React from "react";
import { FiltersRow, FilterButton } from "./StyledComponents";

type MangaFiltersProps = {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
};

const FILTERS = [
  { label: "Todos", value: null },
  { label: "Shounen", value: "Shounen" },
  { label: "Shoujo", value: "Shoujo" },
  { label: "Seinen", value: "Seinen" },
  { label: "Isekai", value: "Isekai" },
];

export function MangaFilters({ selectedType, onSelectType }: MangaFiltersProps) {
  return (
    <FiltersRow>
      {FILTERS.map((filter) => (
        <FilterButton
          key={filter.label}
          onClick={() => onSelectType(filter.value)}
          className={selectedType === filter.value ? "active" : ""}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FiltersRow>
  );
}
