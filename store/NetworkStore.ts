import { create } from "zustand";
import { combine } from "zustand/middleware";

export const networkStore = create(
  combine(
    {
      network: "",
    },
    (set, get) => ({
      // toggleSecondColumn: () =>
      //   set(() => ({
      //     isFirstColClicked: !get().isFirstColClicked,
      //   })),

      setPathname: (newData: any) => set({ network: newData }),
    })
  )
);
