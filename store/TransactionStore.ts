import { create } from "zustand";
import { combine } from "zustand/middleware";

export const transactionStore = create(
  combine(
    {
      accountTransactionHistory: [],
      searchInput: "",
      isSwitchSelected: false,
    },
    (set, get) => ({
      switchHistoryRecord: () =>
        set(() => ({
          isSwitchSelected: !get().isSwitchSelected,
        })),

      setAddressSearch: (input: string) => set({ searchInput: input }),

      setAccountTransactionHistory: (newHistory: any) =>
        set({ accountTransactionHistory: newHistory }),
    })
  )
);
