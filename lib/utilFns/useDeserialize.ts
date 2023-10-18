import { Serializer, utils } from "koilib";

const TOKEN_ENTRY_POINTS: Record<number, string> = {
  0x27f576ca: "transfer",
  0xdc6f17bb: "mint",
  0x859facc5: "burn",
};

const serializer = new Serializer(utils.tokenAbi.koilib_types!);

type ParsedTransaction = {
  id: string;
  manaUsed?: string;
  operations: {
    index: number;
    type: string;
    contractId: string;
    from?: string;
    to?: string;
    amount?: string;
    symbol?: string;
    memo?: string;
    entrypoint?: string;
    args?: unknown;
  }[];
};

async function refreshHistory(): Promise<void> {
  if (!selectedNetwork.value || !historyTransactions.value) return;

  try {
    isLoading.value = true;

    const parsedTxs: ParsedTransaction[] = [];

    for (const historyTx of historyTransactions.value) {
      if (historyTx.trx) {
        let manaUsed =
          historyTx.trx.transaction.header?.payer === props.accountAddress
            ? historyTx.trx.receipt.rc_used
            : undefined;

        if (manaUsed) {
          manaUsed = utils.formatUnits(
            manaUsed,
            selectedNetwork?.value?.tokenDecimals
          );
        }

        const parsedTx: ParsedTransaction = {
          id: historyTx.trx.transaction.id!,
          manaUsed,
          operations: [],
        };

        if (historyTx.trx.transaction.operations) {
          for (
            let opIdx = 0;
            opIdx < historyTx.trx.transaction.operations.length;
            opIdx++
          ) {
            const op = historyTx.trx.transaction.operations[opIdx];

            if (op.call_contract) {
              const methodName =
                TOKEN_ENTRY_POINTS[op.call_contract.entry_point];
              if (methodName) {
                try {
                  const args = await serializer.deserialize(
                    op.call_contract.args,
                    `${methodName}_arguments`
                  );
                  const { amount, symbol } = parseSymbolAndAmount(
                    op.call_contract.contract_id!,
                    (args.value as string) || "0"
                  );
                  switch (methodName) {
                    case "transfer": {
                      let type = t("account-history.received");
                      if (props.accountAddress === args.from) {
                        type = t("account-history.sent");
                      }
                      parsedTx.operations.push({
                        index: opIdx,
                        type,
                        contractId: op.call_contract.contract_id!,
                        from: args.from as string,
                        to: args.to as string,
                        amount,
                        symbol,
                        memo: args.memo as string | undefined,
                      });
                      break;
                    }
                    case "burn": {
                      const type = t("account-history.burned");
                      parsedTx.operations.push({
                        index: opIdx,
                        type,
                        contractId: op.call_contract.contract_id!,
                        from: args.from as string,
                        amount,
                        symbol,
                      });
                      break;
                    }
                    case "mint": {
                      const type = t("account-history.minted");
                      parsedTx.operations.push({
                        index: opIdx,
                        type,
                        contractId: op.call_contract.contract_id!,
                        to: args.to as string,
                        amount,
                        symbol,
                      });
                      break;
                    }
                  }
                } catch (error) {
                  parsedTx.operations.push({
                    index: opIdx,
                    type: methodName,
                    contractId: op.call_contract.contract_id!,
                  });
                  console.error(error);
                }
              } else {
                const contract = await getContract(
                  op.call_contract.contract_id!
                );
                let entrypoint = "";
                let finalArgs: unknown;
                if (contract && contract.serializer) {
                  try {
                    const { name, args } = await contract.decodeOperation(op);
                    entrypoint = name;
                    finalArgs = args;
                    // const eventData = await contract.serializer.deserialize(event.data, event.name)
                  } catch (error) {
                    // ignore deserialization errors
                    console.error(error);
                  }
                }

                parsedTx.operations.push({
                  index: opIdx,
                  entrypoint,
                  args: finalArgs,
                  type: t("account-history.contract-interaction"),
                  contractId: op.call_contract.contract_id!,
                });
              }
            } else if (op.upload_contract) {
              parsedTx.operations.push({
                index: opIdx,
                type: t("account-history.contract-upload"),
                contractId: op.upload_contract.contract_id!,
              });
            }
          }
        }

        parsedTxs.push(parsedTx);
      }
    }

    parsedTransactions.value = [...parsedTxs];
    unparsedTransactions.value = [...historyTransactions.value];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
