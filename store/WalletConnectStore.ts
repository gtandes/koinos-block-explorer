import { create } from "zustand";
import { combine } from "zustand/middleware";

export const walletConnectStore = create(
  combine(
    {
      connectedAccount: "",
    },
    (set, get) => ({
      // switchHistoryRecord: () =>
      //   set(() => ({
      //     isSwitchSelected: !get().isSwitchSelected,
      //   })),

      setConnectedAccount: (account: any) => set({ connectedAccount: account }),
    })
  )
);
