import { lazy } from "react";
import { Provider, Serializer, utils } from "koilib";
import { HistoryRecord } from "./useGetAcctHistory";
import { getTokenInformation } from "./useTokens";
// import { fetchMEXCData } from "./useMEXC";

const provider = new Provider(["https://api.koinos.io"]);
const mexcLazy = lazy(() => import("./useMEXC"));

export const deserializeEvents = async (
  account: string,
  historyRecords: HistoryRecord[]
): Promise<HistoryRecord[]> => {
  const serializer = new Serializer(utils.tokenAbi.koilib_types!);

  // iterate over history records
  for (let index = 0; index < historyRecords.length; index++) {
    const historyRec = historyRecords[index];

    // if the history record is about a transaction
    if (historyRec.trx && historyRec.trx.receipt.events) {
      historyRec.trx.receipt.token_events = [];
      // iterate over the events available in the receipt
      for (
        let index = 0;
        index < historyRec.trx.receipt.events.length;
        index++
      ) {
        const event = historyRec.trx.receipt.events[index];

        // if it's a transfer event
        if (event.name.endsWith("transfer_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              from: string;
              to: string;
              value: string;
            }>(event.data, "koinos.contracts.token.transfer_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.trx.receipt.amount = String(
                Number(amount) * mexcKoinLastPrice
              );

              console.log(historyRec.trx.receipt.amount);

              // check if it's token we sent
              if (transferData.from === account) {
                historyRec.trx.receipt.token_events.push(
                  `-${amount} ${tokenInfo.symbol}`
                );
              }
              // otherwise, it's tokens we received
              else {
                historyRec.trx.receipt.token_events.push(
                  `+${amount} ${tokenInfo.symbol}`
                );
              }
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }

        // if it's a mint event
        else if (event.name.endsWith("mint_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              to: string;
              value: string;
            }>(event.data, "koinos.contracts.token.mint_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.trx.receipt.amount = String(
                Number(amount) * mexcKoinLastPrice
              );

              historyRec.trx.receipt.token_events.push(
                `+${amount} ${tokenInfo.symbol} (minted)`
              );
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }
        // if it's a burn event
        else if (event.name.endsWith("burn_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              from: string;
              value: string;
            }>(event.data, "koinos.contracts.token.burn_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.trx.receipt.amount = String(
                Number(amount) * mexcKoinLastPrice
              );

              historyRec.trx.receipt.token_events.push(
                `-${amount} ${tokenInfo.symbol} (burned)`
              );
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }
      }
    }

    // if the history record is about a block
    else if (historyRec.block && historyRec.block.receipt.events) {
      historyRec.block.receipt.token_events = [];
      // iterate over the events available in the receipt
      for (
        let index = 0;
        index < historyRec.block.receipt.events.length;
        index++
      ) {
        const event = historyRec.block.receipt.events[index];

        // if it's a transfer event
        if (event.name.endsWith("transfer_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              from: string;
              to: string;
              value: string;
            }>(event.data, "koinos.contracts.token.transfer_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.block.receipt.amount = amount;

              // check if it's token we sent
              if (transferData.from === account) {
                historyRec.block.receipt.token_events.push(
                  `-${amount} ${tokenInfo.symbol}`
                );
              }
              // otherwise, it's tokens we received
              else {
                historyRec.block.receipt.token_events.push(
                  `+${amount} ${tokenInfo.symbol}`
                );
              }
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }

        // if it's a mint event
        else if (event.name.endsWith("mint_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              to: string;
              value: string;
            }>(event.data, "koinos.contracts.token.mint_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.block.receipt.amount = amount;

              historyRec.block.receipt.token_events.push(
                `+${amount} ${tokenInfo.symbol} (minted)`
              );
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }

        // if it's a burn event
        else if (event.name.endsWith("burn_event")) {
          try {
            // try to deserialize the event data
            const transferData = await serializer.deserialize<{
              from: string;
              value: string;
            }>(event.data, "koinos.contracts.token.burn_event");

            // get the token's information
            const tokenInfo = await getTokenInformation(provider, event.source);

            if (tokenInfo) {
              // format the amount
              const amount = utils.formatUnits(
                transferData.value,
                tokenInfo.decimals
              );

              historyRec.block.receipt.amount = amount;

              historyRec.block.receipt.token_events.push(
                `-${amount} ${tokenInfo.symbol} (burned)`
              );
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }
      }
    }
  }

  return historyRecords;
};
