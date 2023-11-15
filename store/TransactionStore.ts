import { create } from "zustand";
import { combine } from "zustand/middleware";

export const transactionStore = create(
  combine(
    {
      searchInput: "",
      koinBalance: "",
      isSwitchSelected: false,
    },
    (set, get) => ({
      switchHistoryRecord: () =>
        set(() => ({
          isSwitchSelected: !get().isSwitchSelected,
        })),

      setKoinBalance: (newBalance: any) => set({ koinBalance: newBalance }),
      setAddressSearch: (input: string) => set({ searchInput: input }),
    })
  )
);
