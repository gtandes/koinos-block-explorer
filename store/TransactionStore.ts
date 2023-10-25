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
      deserializedAmount: "",
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

      setKoinBalance: (newBalance: any) => set({ koinBalance: newBalance }),
      setVHPBalance: (newBalance: any) => set({ vhpBalance: newBalance }),
      setWethBalance: (newBalance: any) => set({ wEthBalance: newBalance }),
      setDeserializedBalance: (newBalance: any) =>
        set({ deserializedAmount: newBalance }),

      setManaPercentBalance: (newBalance: any) =>
        set({ manaPercentBalance: newBalance }),
    })
  )
);
