import { Contract, Provider } from "koilib";

const cache = new Map<string, { expiration: number; contract: Contract }>();

export async function getContract(
  provider: Provider,
  contractId: string
): Promise<Contract | undefined> {
  const cacheObj = cache.get(contractId);

  if (cacheObj && cacheObj.expiration > new Date().getTime()) {
    return cacheObj.contract;
  }

  try {
    let contract = new Contract({
      id: contractId,
      provider,
    });

    const abi = await contract.fetchAbi();

    if (abi) {
      Object.keys(abi.methods).forEach((name) => {
        abi!.methods[name] = {
          ...abi!.methods[name],
        };

        //@ts-ignore this is needed to be compatible with "old" abis
        if (abi.methods[name]["entry-point"]) {
          //@ts-ignore this is needed to be compatible with "old" abis
          abi.methods[name].entry_point = parseInt(
            abi.methods[name]["entry-point"]
          );
        }

        //@ts-ignore this is needed to be compatible with "old" abis
        if (abi.methods[name]["read-only"] !== undefined) {
          //@ts-ignore this is needed to be compatible with "old" abis
          abi.methods[name].read_only = abi.methods[name]["read-only"];
        }
      });
    }

    contract = new Contract({
      id: contractId,
      provider,
      abi,
    });

    cache.set(contractId, {
      contract,
      expiration: new Date().getTime() + 3600000,
    });

    return contract;
  } catch (error) {
    console.error(error);
  }

  return;
}
