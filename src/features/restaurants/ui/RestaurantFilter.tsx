import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@/components/common/Box";
import Button from "@/components/common/Button";
import { restaurantStore } from "@/features/restaurants/model/restaurantStore";

const categories = ["전체", "한식", "면요리", "일식", "분식", "도시락", "카페"];

const RestaurantFilter = observer(() => {
  return (
    <Box className="floating-panel glass-card p-3 rounded-[24px] bg-white/72 backdrop-blur-xl border-white/55 grid gap-3 shadow-xl">
      {/* Small Search Bar */}
      <Box className="flex items-center min-h-[2.8rem] px-4 rounded-full border border-slate-200 bg-white/80 focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="search"
          placeholder="가게명/지역 검색"
          className="w-full border-0 outline-none bg-transparent text-sm font-semibold"
          value={restaurantStore.searchQuery}
          onChange={(e) => restaurantStore.setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Category Horizontal Chips */}
      <Box className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={restaurantStore.selectedCategory === cat ? "contained" : "text"}
            onClick={() => restaurantStore.setSelectedCategory(cat)}
            className={`min-h-[2rem] px-3 rounded-full text-[0.78rem] font-bold whitespace-nowrap transition-all ${
              restaurantStore.selectedCategory === cat
                ? "bg-slate-800 text-white"
                : "bg-white/60 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {cat}
          </Button>
        ))}
      </Box>
    </Box>
  );
});

export default RestaurantFilter;
