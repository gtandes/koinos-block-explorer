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
    },
    (set, get) => ({
      // toggleSecondColumn: () =>
      //   set(() => ({
      //     isFirstColClicked: !get().isFirstColClicked,
      //   })),

      setAccountTransactionHistory: (prevHistory: any) =>
        set({ accountTransactionHistory: prevHistory }),

      setKoinBalance: (prevBalance: any) => set({ koinBalance: prevBalance }),
      setVHPBalance: (prevBalance: any) => set({ vhpBalance: prevBalance }),
      setWethBalance: (prevBalance: any) => set({ wEthBalance: prevBalance }),

      setAddressSearch: (input: string) => set({ searchInput: input }),
    })
  )
);
