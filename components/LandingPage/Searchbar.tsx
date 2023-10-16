"use client";

import { useState } from "react";
import { utils } from "koilib";
import { Button } from "@nextui-org/react";

import { useClient } from "@/lib/utilFns/useClient";
import { useKAP } from "@/lib/utilFns/useKAP";
import { useNicknames } from "@/lib/utilFns/useNameService";
import { Input } from "../ui/input";

export default function SearchComponent() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { client } = useClient();
  const { getKAPOwnerAddress } = useKAP();
  const { getNicknameOwner } = useNicknames();

  const isTransactionId = (input: string) => {
    if (!input.startsWith("0x1220") || input.length !== 70) {
      return false;
    }
    const regexp = /0x[0-9A-Fa-f]{68}/g;
    return regexp.test(input);
  };

  const isAddress = (input: string) => {
    if (input.length < 26 || input.length > 35) {
      return false;
    }

    try {
      utils.decodeBase58(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const blockExists = async () => {
    try {
      if (client) {
        const { block_items } = await client.blockStore.getBlocksById([input]);
        if (block_items.length > 0 && block_items[0].block_id) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const transactionExist = async () => {
    try {
      if (client) {
        const { transactions } =
          await client.transactionStore.getTransactionsById([input]);
        return transactions && transactions.length > 0;
      }
      return false; // Handle the case where 'client' is null
    } catch (e) {
      return false;
    }
  };

  const KAPExists = async (address: string): string | undefined => {
    try {
      return await getKAPOwnerAddress(address);
    } catch (e) {
      return;
    }
  };

  const nicknameExists = async (nickname: string): string | undefined => {
    try {
      return await getNicknameOwner(nickname);
    } catch (e) {
      return;
    }
  };

  const gotoLink = (type: "block" | "tx" | "address", id: string) => {
    window.location.href = `/${type}/${id}`;
  };

  const search = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage("");
    if (isTransactionId(input)) {
      if (await blockExists(input)) {
        gotoLink("block", input);
      } else if (await transactionExist(input)) {
        gotoLink("tx", input);
      } else {
        setError(true);
        setErrorMessage(
          "Could not find transaction or block with specified ID"
        );
      }
    } else if (isAddress(input)) {
      gotoLink("address", input);
    } else if (Number(input).toString() === input) {
      try {
        const { topology } = await client.blockStore.getHighestBlock();
        const { block_items } = await client.blockStore.getBlocksByHeight(
          topology.id,
          Number(input),
          1
        );
        if (block_items.length > 0 && block_items[0]?.block_id) {
          gotoLink("block", input);
        } else {
          setErrorMessage("Could not find block with specified height");
          setError(true);
        }
      } catch (e) {
        setErrorMessage("Could not find block with specified height");
        setError(true);
      }
    } else {
      const address = (await KAPExists(input)) || (await nicknameExists(input));
      if (address) {
        gotoLink("address", address);
      } else {
        setErrorMessage("Invalid input");
        setError(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full flex items-center justify-center mt-10">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ron.Koin"
        className="w-[40%] text-almost-black mr-8"
      />

      <Button size="lg" color="success" onClick={search}>
        Search
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {errorMessage}</p>}
    </div>
  );
}
