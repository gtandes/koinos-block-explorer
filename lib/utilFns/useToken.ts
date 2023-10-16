import { Client } from "koinos-rpc";
import { Token } from "koinos-rpc/dist/helpers/token";
import { useClient } from "./useClient";

type TokenFunctions = {
  createToken: (address: string) => Promise<Token>;
};

export function useToken(): TokenFunctions {
  const { client } = useClient();

  const createToken = async (address: string): Promise<Token> => {
    return Token.create(client as Client, address);
  };

  return {
    createToken,
  };
}
