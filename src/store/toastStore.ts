import { makeAutoObservable } from "mobx";

export interface Toast {
  id: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  duration?: number;
}

export const createToastStore = () => {
  const store = {
    toasts: [] as Toast[],
    isLoading: false,

    addToast(toast: Omit<Toast, "id">) {
      const id = Math.random().toString(36).substring(2, 9);
      this.toasts.push({ ...toast, id });
      
      const duration = toast.duration ?? 3000;
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    },

    removeToast(id: string) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },

    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
  };

  return makeAutoObservable(store);
};

export const toastStore = createToastStore();
