import React from "react";
import { observer } from "mobx-react-lite";
import { Search, SlidersHorizontal } from "lucide-react";
import Box from "@/components/common/Box";
import Button from "@/components/common/Button";
import { mapStore } from "@/store/mapStore";
import { uiStore } from "@/store/uiStore";

const Header = observer(() => {
  const openFilterSheet = () => {
    mapStore.setSelectedSpot(null);
    uiStore.setFilterSheetOpen(true);
  };

  const renderFilterChip = (category: string) => (
    <Box
      key={category}
      onClick={() => mapStore.setSelectedCategory(category)}
      className={`flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-[12px] font-bold whitespace-nowrap transition-all ${
        mapStore.selectedCategory === category
          ? "border-accent bg-accent text-bg"
          : "border-border bg-surface text-text2 hover:border-accent hover:text-accent"
      }`}
    >
      {category}
      {mapStore.selectedCategory === category && (
        <span className="text-[10px] opacity-60">✕</span>
      )}
    </Box>
  );

  return (
    <>
      <Box className="fixed top-[34px] left-0 right-0 z-100 border-b border-border bg-bg/92 backdrop-blur-[20px] sm:hidden">
        <Box className="flex h-[56px] items-center gap-2 px-3">
          <Box className="mr-1 flex min-w-0 flex-1 items-center gap-2">
            <Box className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <Box className="truncate bg-linear-to-br from-accent to-accent2 bg-clip-text text-[18px] font-extrabold tracking-tight text-transparent">
              스팟맵
            </Box>
          </Box>

          <Box className="flex shrink-0 items-center gap-1.5">
            <Button
              variant="outlined"
              className="h-8 w-8 min-w-0 rounded-lg border-border bg-surface p-0 text-text hover:border-accent2 hover:bg-surface2"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="outlined"
              className="h-8 rounded-lg border-warn px-2.5 text-[11px] font-bold text-warn hover:bg-warn hover:text-bg"
            >
              ☕ 후원
            </Button>
            <Button
              variant="contained"
              className="h-8 rounded-lg bg-linear-to-br from-accent to-accent2 px-3 text-[11px] font-bold text-bg hover:opacity-85"
              onClick={() => uiStore.setSubmitModalOpen(true)}
            >
              + 제보
            </Button>
          </Box>
        </Box>

        <Box className="flex h-[44px] items-center gap-2 border-t border-border/70 px-3">
          <Button
            type="button"
            variant="outlined"
            onClick={openFilterSheet}
            aria-label="필터 열기"
            className="h-8 w-8 min-w-0 shrink-0 rounded-full border-border bg-surface2 p-0 text-text hover:border-accent2 hover:text-accent2"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Box className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth">
            {mapStore.filterCategories.map(renderFilterChip)}
          </Box>
        </Box>
      </Box>

      <Box className="fixed top-[34px] left-0 right-0 z-100 hidden h-[60px] items-center gap-2.5 border-b border-border bg-bg/85 px-4 backdrop-blur-[20px] sm:flex">
        <Box className="mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <Box className="mr-1 whitespace-nowrap bg-linear-to-br from-accent to-accent2 bg-clip-text text-[20px] font-extrabold tracking-tight text-transparent">
          스팟맵
        </Box>

        <Box className="flex h-full min-w-0 flex-1 items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth">
          <Button
            type="button"
            variant="outlined"
            onClick={openFilterSheet}
            className="flex h-8 items-center gap-1.5 rounded-full border-border bg-surface2 px-3 text-[12px] font-bold whitespace-nowrap text-text hover:border-accent2 hover:text-accent2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            필터링
          </Button>
          {mapStore.filterCategories.map(renderFilterChip)}
        </Box>

        <Box className="flex shrink-0 items-center gap-2">
          <Button
            variant="outlined"
            className="h-9 w-9 min-w-0 rounded-lg border-border bg-surface p-0 text-text hover:border-accent2 hover:bg-surface2"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="outlined"
            className="flex h-9 items-center gap-1.5 rounded-lg border-warn px-3.5 text-[12px] font-bold text-warn hover:bg-warn hover:text-bg"
          >
            ☕ 커피 후원
          </Button>
          <Button
            variant="contained"
            className="h-9 rounded-lg bg-linear-to-br from-accent to-accent2 px-3.5 text-[12px] font-bold text-bg hover:opacity-85"
            onClick={() => uiStore.setSubmitModalOpen(true)}
          >
            + 제보하기
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default Header;
