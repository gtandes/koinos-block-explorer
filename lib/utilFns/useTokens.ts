import { Provider } from "koilib";
import { getContract } from "./useContracts";

const cache = new Map<string, { expiration: number; token: Token }>();

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  requiresAllowances?: boolean;
};

export async function getTokenInformation(
  provider: Provider,
  tokenAddress: string
): Promise<Token | undefined> {
  const cacheObj = cache.get(tokenAddress);

  if (cacheObj && cacheObj.expiration > new Date().getTime()) {
    return cacheObj.token;
  }

  const token: Token = {
    address: tokenAddress,
    decimals: 0,
    name: "",
    symbol: "",
  };

  const contract = await getContract(provider, tokenAddress);

  if (!contract) {
    return;
  }

  let result = await contract.functions.name();

  if (result.result) {
    token.name = result.result.value as string;
  }

  result = await contract.functions.symbol();

  if (result.result) {
    token.symbol = result.result.value as string;
  }

  result = await contract.functions.decimals();

  if (result.result) {
    token.decimals = parseInt(result.result.value as string);
  }

  cache.set(tokenAddress, {
    token,
    expiration: new Date().getTime() + 3600000,
  });

  return token;
}
