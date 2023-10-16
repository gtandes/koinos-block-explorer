import { useEffect, useState } from "react";
import { Client } from "koinos-rpc";
import { Field } from "protobufjs";
import { config } from "../config";

export type Argument = {
  name: string;
  details: Field;
};

export function useClient() {
  const [initialClient, setInitialClient] = useState<Client | null>(null);
  const [client, setClient] = useState<Client | null>(null);

  const updateApiAddress = (api: string) => {
    setClient(new Client([api]));
  };

  useEffect(() => {
    setInitialClient(
      new Client([localStorage.getItem("api") ?? config.DEFAULT_API_NODES[0]])
    );
  }, []);

  useEffect(() => {
    setClient(initialClient);
  }, [initialClient]);

  return { updateApiAddress, client };
}
