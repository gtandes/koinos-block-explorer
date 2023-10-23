import { create } from "zustand";
import { combine } from "zustand/middleware";

export const urlStore = create(
  combine(
    {
      pathname: "",
    },
    (set, get) => ({
      // toggleSecondColumn: () =>
      //   set(() => ({
      //     isFirstColClicked: !get().isFirstColClicked,
      //   })),

      setPathname: (newPathname: any) => set({ pathname: newPathname }),
    })
  )
);
