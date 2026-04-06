import { makeAutoObservable } from "mobx";

export interface User {
  id: string;
  name: string;
  email: string;
}

export const createAuthStore = () => {
  const store = {
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,

    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },

    setToken(token: string | null) {
      this.token = token;
      // In a real app, this might be stored in HttpOnly cookies by the server
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
  };

  return makeAutoObservable(store);
};

export const authStore = createAuthStore();
