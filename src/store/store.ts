import { create, StateCreator } from "zustand";

import { User } from "@/types/auth";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";
import zukeeper from "zukeeper";
import axios from "axios";
import baseService from "@/https/base.service";
import Cookies from "js-cookie";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role?: "admin" | "visitor";
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsAuthenticated: (
    authenticated: boolean,
  ) => void;
  // getState: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(
  // zukeeper(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      clearUser: () => {
        Cookies.remove("token");
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      setIsAuthenticated: (
        authenticated: boolean,
      ) =>
        set({ isAuthenticated: authenticated }),

      getState: async () => {
        const response = await baseService.get(
          "profile",
          {
            url: "profile",
          },
        );
        if (response === "success") {
          set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(
        () => localStorage,
      ),
    },
  ) as StateCreator<AuthState>,
);
// );

// (
//   set: (arg0: {
//     user?: User | null;
//     isAuthenticated: boolean;
//   }) => void,
// ) => ({
//   user: null,
//   isAuthenticated: false,
//   setUser: (user: User) => {
//     set({ user, isAuthenticated: true });
//   },
//   clearUser: () =>
//     set({
//       user: null,
//       isAuthenticated: false,
//     }),
//   setIsAuthenticated: (
//     authenticated: boolean,
//   ) =>
//     set({ isAuthenticated: authenticated }),
// })

// (
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       setUser: (user: User) => {
//         set({ user, isAuthenticated: true });
//       },
//       clearUser: () =>
//         set({
//           user: null,
//           isAuthenticated: false,
//         }),
//       setIsAuthenticated: (
//         authenticated: boolean,
//       ) =>
//         set({ isAuthenticated: authenticated }),
//     }),
//     {
//       name: "auth-storage",
//       storage: createJSONStorage(
//         () => sessionStorage,
//       ),
//     },
//   ) as StateCreator<AuthState>,
// )

// declare global {
//   interface Window {
//     store: typeof useAuthStore;
//   }
// }
//
// if (typeof window !== "undefined") {
//   window.store = useAuthStore;
// }
