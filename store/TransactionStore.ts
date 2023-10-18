import { create } from "zustand";
import { combine } from "zustand/middleware";

export const transactionStore = create(
  combine(
    {
      accountTransactionHistory: [],
      accountTokenBalance: [],
      searchInput: "",
      koinBalance: "",
      vhpBalance: "",
      wEthBalance: "",
      manaPercentBalance: "",
    },
    (set, get) => ({
      // toggleSecondColumn: () =>
      //   set(() => ({
      //     isFirstColClicked: !get().isFirstColClicked,
      //   })),

      setAccountTransactionHistory: (newHistory: any) =>
        set({ accountTransactionHistory: newHistory }),

      setKoinBalance: (newBalance: any) => set({ koinBalance: newBalance }),
      setVHPBalance: (newBalance: any) => set({ vhpBalance: newBalance }),
      setWethBalance: (newBalance: any) => set({ wEthBalance: newBalance }),
      setManaPercentBalance: (newBalance: any) =>
        set({ manaPercentBalance: newBalance }),

      setAddressSearch: (input: string) => set({ searchInput: input }),
    })
  )
);
