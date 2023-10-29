"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccountHistory } from "../utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";
import { deserializeEvents } from "../utilFns/useDeserializer";
import { getTransactionsTimestamps } from "../utilFns/useTransactions";

export const useSearchTrxRecords = () => {
  const { searchInput } = transactionStore();

  return useQuery({
    queryKey: ["trxRecords"],
    queryFn: async () => {
      let acctHistSearchRes = await getAccountHistory(searchInput, 20);

      acctHistSearchRes = await deserializeEvents(
        searchInput,
        acctHistSearchRes
      );

      acctHistSearchRes = await getTransactionsTimestamps(acctHistSearchRes);
      return acctHistSearchRes;
    },
  });
};
export const useSearchBlockRecords = () => {
  const { searchInput } = transactionStore();

  return useQuery({
    queryKey: ["blockRecords"],
    queryFn: async () => {
      let acctHistSearchRes = await getAccountHistory(searchInput, 20);

      acctHistSearchRes = await deserializeEvents(
        searchInput,
        acctHistSearchRes
      );

      acctHistSearchRes = await getTransactionsTimestamps(acctHistSearchRes);
      return acctHistSearchRes;
    },
  });
};
