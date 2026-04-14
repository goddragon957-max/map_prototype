import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { cn } from "@/lib/utils";
import { mapStore } from "@/store/mapStore";

interface RestaurantFilterProps {
  className?: string;
  withContainer?: boolean;
}

const RestaurantFilter = observer(
  ({ className, withContainer = true }: RestaurantFilterProps) => {
    const filterBody = (
      <>
        <Box className="grid gap-1">
          <Typography className="text-[11px] font-bold uppercase tracking-[0.14em] text-text3">
            검색
          </Typography>
          <Box className="flex min-h-[2.75rem] items-center rounded-full border border-border bg-surface2/80 px-3.5 focus-within:border-accent2 focus-within:ring-2 focus-within:ring-accent2/20">
            <input
              type="search"
              placeholder="가게명 / 주소 / 카테고리"
              className="w-full border-0 bg-transparent text-[13px] font-medium text-text outline-none placeholder:text-text3"
              value={mapStore.searchQuery}
              onChange={(e) => mapStore.setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        <Box className="grid gap-1.5">
          <Box className="flex items-center justify-between gap-3">
            <Typography className="text-[11px] font-bold uppercase tracking-[0.14em] text-text3">
              카테고리
            </Typography>
            <button
              type="button"
              onClick={() => mapStore.clearFilters()}
              className="text-[11px] font-semibold text-text3 transition-colors hover:text-accent"
            >
              초기화
            </button>
          </Box>
          <Box className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {mapStore.filterCategories.map((cat) => (
              <Button
                key={cat}
                variant={mapStore.selectedCategory === cat ? "contained" : "text"}
                onClick={() => mapStore.setSelectedCategory(cat)}
                className={cn(
                  "min-h-8 rounded-full px-3 text-[12px] font-bold whitespace-nowrap transition-all",
                  mapStore.selectedCategory === cat
                    ? "bg-accent text-bg hover:opacity-95"
                    : "bg-surface2/70 text-text2 hover:bg-surface2 hover:text-text"
                )}
              >
                {cat}
              </Button>
            ))}
          </Box>
        </Box>

        <Box className="rounded-2xl border border-border/80 bg-surface/60 px-3 py-2">
          <Typography className="text-[12px] font-medium text-text2">
            현재 조건에 맞는 스팟 <span className="font-black text-accent">{mapStore.filteredSpots.length}개</span>
          </Typography>
        </Box>
      </>
    );

    if (!withContainer) {
      return <Box className={cn("grid gap-3", className)}>{filterBody}</Box>;
    }

    return (
      <Box
        className={cn(
          "floating-panel glass-card grid gap-3 rounded-[24px] border-border/80 bg-surface/92 p-3 shadow-xl",
          className
        )}
      >
        {filterBody}
      </Box>
    );
  }
);

export default RestaurantFilter;
