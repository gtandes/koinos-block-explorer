import { useState } from "react";
import * as kondor from "kondor-js";

export interface KondorAccount {
  name: string;
  address: string;
}

const storageAccounts = localStorage.getItem("kondorAccounts");

export function useKondor() {
  const [accounts, setAccounts] = useState<KondorAccount[]>(
    storageAccounts ? JSON.parse(storageAccounts) : []
  );

  const requestAccounts = async () => {
    try {
      const fetchedAccounts =
        (await kondor.getAccounts()) as unknown as KondorAccount[]; // Types in kondor-js are wrong
      setAccounts(fetchedAccounts);
      localStorage.setItem("kondorAccounts", JSON.stringify(fetchedAccounts));
    } catch (e) {
      console.error("error", e);
    }
  };

  return {
    accounts,
    requestAccounts,
    getSigner: (signerAddress: string) => kondor.getSigner(signerAddress),
    logout: () => {
      localStorage.removeItem("kondorAccounts");
      setAccounts([]);
    },
  };
}
