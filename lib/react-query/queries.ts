import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getAccountHistory } from "../utilFns/useGetAcctHistory";
import { transactionStore } from "@/store/TransactionStore";
import { deserializeEvents } from "../utilFns/useDeserializer";
import { getTransactionsTimestamps } from "../utilFns/useTransactions";
import {
  consultGeneralInfo,
  getBurned,
  getNetworkHeight,
} from "../utilFns/useNetwork";

import { Contract, Provider, utils } from "koilib";

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

export const useGetBurned = () => {
  return useQuery({
    queryKey: ["burnedKoin"],
    queryFn: async () => await getBurned(),
  });
};

export const useGetNetworkHeight = () => {
  return useQuery({
    queryKey: ["networkHeight"],
    queryFn: async () => await getNetworkHeight(),
  });
};

export const useGetKoinClaimed = () => {
  return useQuery({
    queryKey: ["koinClaimed"],
    queryFn: async () => await consultGeneralInfo(),
  });
};

export const useGetTotalKoinValue = () => {
  return useQuery({
    queryKey: ["totalKoinValue"],
    queryFn: async () => {
      const provider = new Provider(["https://api.koinos.io"]);

      const koinContract = new Contract({
        id: "15DJN4a8SgrbGhhGksSBASiSYjGnMU8dGL",
        abi: utils.tokenAbi,
        provider,
      });

      const koin = koinContract.functions;
      const { result: totalKoin } = await koin.balanceOf();
      const totalKoinValue = totalKoin?.value ? parseFloat(totalKoin.value) : 0;
      return totalKoinValue;
    },
  });
};

export const useCoinGeckoKoinPrice = () => {
  return useQuery({
    queryKey: ["coinGeckoKoinPrice"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=koinos&vs_currencies=usd"
      );

      return response.data;
    },
  });
};
