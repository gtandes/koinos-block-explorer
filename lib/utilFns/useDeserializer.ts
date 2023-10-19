import { Provider, Serializer, utils } from "koilib";

import { getAccountHistory } from "./useGetAcctHistory";
import { getTokenInformation } from "./useTokens";

export const deserialize = async (searchInput: string) => {
  // const accountAddress = "1PWdJ3VFB6kwu6wLdLPr9BwQZrNiPs7g8j";
  // const accountAddress = '1NsQbH5AhQXgtSNg1ejpFqTi2hmCWz1eQS'
  const accountAddress = searchInput;
  const provider = new Provider("https://api.koinos.io");
  const historyRecs = await getAccountHistory(accountAddress, 11);

  const serializer = new Serializer(utils.tokenAbi.koilib_types!);

  // iterate over history records
  for (let index = 0; index < historyRecs.length; index++) {
    const historyRec = historyRecs[index];

    // if the history record is about a transaction
    if (historyRec.trx && historyRec.trx.receipt.events) {
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

              // check if it's token we sent
              if (transferData.from === accountAddress) {
                console.log(`-${amount} ${tokenInfo.symbol} (sent)`);
                return `-${amount} ${tokenInfo.symbol} (sent)`;
              }
              // otherwise, it's tokens we received
              else {
                console.log(`+${amount} ${tokenInfo.symbol} (gained)`);
                return `+${amount} ${tokenInfo.symbol} (gained)`;
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

              console.log(`+${amount} ${tokenInfo.symbol} (minted)`);
              return `+${amount} ${tokenInfo.symbol} (minted)`;
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

              console.log(`-${amount} ${tokenInfo.symbol} (burned)`);
              return `-${amount} ${tokenInfo.symbol} (burned)`;
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }
      }
    } // if the history record is about a block
    else if (historyRec.block && historyRec.block.receipt.events) {
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

              // check if it's token we sent
              if (transferData.from === accountAddress) {
                console.log(`-${amount} ${tokenInfo.symbol} (sent)`);
                return `-${amount} ${tokenInfo.symbol} (sent)`;
              }
              // otherwise, it's tokens we received
              else {
                console.log(`+${amount} ${tokenInfo.symbol} (gained)`);
                return `+${amount} ${tokenInfo.symbol} (gained)`;
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

              console.log(`+${amount} ${tokenInfo.symbol} (minted)`);
              return `+${amount} ${tokenInfo.symbol} (minted)`;
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

              console.log(`-${amount} ${tokenInfo.symbol} (burnt)`);
              return `-${amount} ${tokenInfo.symbol} (burnt)`;
            }
          } catch (error) {
            // ignore deserialization errors
          }
        }
      }
    }
  }
};
