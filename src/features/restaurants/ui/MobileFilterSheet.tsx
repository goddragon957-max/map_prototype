import React from "react";
import { observer } from "mobx-react-lite";
import { SlidersHorizontal } from "lucide-react";
import Box from "@/components/common/Box";
import Button from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RestaurantFilter from "@/features/restaurants/ui/RestaurantFilter";
import { uiStore } from "@/store/uiStore";

const MobileFilterSheet = observer(() => {
  return (
    <Dialog open={uiStore.isFilterSheetOpen} onOpenChange={uiStore.setFilterSheetOpen}>
      <DialogContent className="left-0 right-0 top-auto bottom-0 z-[150] w-full translate-x-0 translate-y-0 rounded-t-[28px] rounded-b-none border-x-0 border-b-0 bg-bg/98 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-20px_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:left-1/2 sm:right-auto sm:top-1/2 sm:bottom-auto sm:w-[min(30rem,calc(100vw-32px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:border sm:px-6 sm:pb-6 sm:pt-6 sm:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <Box className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />

        <Box className="mb-4 flex items-start justify-between gap-4">
          <Box className="flex items-start gap-3">
            <Box className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border border-accent2/20 bg-accent2/10 text-accent2">
              <SlidersHorizontal className="h-[18px] w-[18px]" />
            </Box>
            <Box>
              <Typography className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-text3">
                Spot Filter
              </Typography>
              <Typography className="text-[18px] font-extrabold tracking-tight text-text">
                스팟 필터
              </Typography>
            </Box>
          </Box>

          <Button
            type="button"
            variant="text"
            onClick={() => uiStore.setFilterSheetOpen(false)}
            className="h-9 rounded-full px-4 text-[12px] font-bold text-text2 hover:text-text"
          >
            닫기
          </Button>
        </Box>

        <RestaurantFilter withContainer={false} className="gap-4" />
      </DialogContent>
    </Dialog>
  );
});

export default MobileFilterSheet;
