import { makeAutoObservable } from "mobx";

export type ViewMode = "map" | "list" | "rank" | "community";

export const createUiStore = () => {
  const store = {
    mode: "map" as ViewMode,
    isSubmitModalOpen: false,
    isFilterSheetOpen: false,

    setMode(mode: ViewMode) {
      this.mode = mode;
      
      // Auto scroll logic for single-page prototype
      if (typeof window !== "undefined") {
        const id = mode === "map" ? "#map-workspace" : `#${mode}-section`;
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },

    setSubmitModalOpen(open: boolean) {
      this.isSubmitModalOpen = open;
    },

    setFilterSheetOpen(open: boolean) {
      this.isFilterSheetOpen = open;
    },
  };

  return makeAutoObservable(store);
};

export const uiStore = createUiStore();
