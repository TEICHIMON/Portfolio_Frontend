import { create, StateCreator } from "zustand";

import { User } from "@/types/auth";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role?: "admin" | "visitor";
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsAuthenticated: (
    authenticated: boolean,
  ) => void;
};

export const useAuthStore = create<AuthState>(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
      setIsAuthenticated: (
        authenticated: boolean,
      ) =>
        set({ isAuthenticated: authenticated }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(
        () => sessionStorage,
      ),
    },
  ) as StateCreator<AuthState>,
);
