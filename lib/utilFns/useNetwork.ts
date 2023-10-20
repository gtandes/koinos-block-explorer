import { Contract, Provider, utils } from "koilib";
import { formatNumberWithCommas } from "./useFormatInput";

let defaultKoinosProvider = "https://api.koinos.io";
const provider = new Provider(defaultKoinosProvider);

export const getBurned = async () => {
  const vhpContract = new Contract({
    id: "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
    abi: utils.tokenAbi,
    provider,
  });

  const vhp = vhpContract.functions;

  const { result: vhpSupply } = await vhp.totalSupply();

  const { result: decimalsRes } = await vhp.decimals();

  const formattedBurnedAmount = utils.formatUnits(
    vhpSupply?.value,
    decimalsRes?.value
  );

  return formatNumberWithCommas(Number(formattedBurnedAmount).toFixed(2));
};

export const getNetworkHeight = async () => {
  const { head_topology } = await provider.getHeadInfo();
  return formatNumberWithCommas(head_topology.height);
};

// function getClaimContract(provider: Provider) {
//   return new Contract({
//     id: "18zw3ZokdfHtudzaWAUnU4tUvKzKiJeN76",
//     abi: {
//       methods: {
//         claim: {
//           argument: "claim_arguments",
//           return: "claim_result",
//           entry_point: 0xdd1b3c31,
//           read_only: false,
//         },
//         get_info: {
//           argument: "get_info_arguments",
//           return: "get_info_result",
//           entry_point: 0xbd7f6850,
//           read_only: true,
//         },
//         check_claim: {
//           argument: "check_claim_arguments",
//           return: "check_claim_result",
//           entry_point: 0x2ac66b4c,
//           read_only: true,
//         },
//       },
//       koilib_types: {
//         nested: {
//           koinos: {
//             nested: {
//               contracts: {
//                 nested: {
//                   claim: {
//                     options: {
//                       go_package:
//                         "github.com/koinos/koinos-proto-golang/koinos/contracts/claim",
//                     },
//                     nested: {
//                       claim_info: {
//                         fields: {
//                           total_eth_accounts: {
//                             type: "uint32",
//                             id: 1,
//                           },
//                           eth_accounts_claimed: {
//                             type: "uint32",
//                             id: 2,
//                           },
//                           total_koin: {
//                             type: "uint64",
//                             id: 3,
//                           },
//                           koin_claimed: {
//                             type: "uint64",
//                             id: 4,
//                           },
//                         },
//                       },
//                       claim_status: {
//                         fields: {
//                           token_amount: {
//                             type: "uint64",
//                             id: 1,
//                             options: {
//                               jstype: "JS_STRING",
//                             },
//                           },
//                           claimed: {
//                             type: "bool",
//                             id: 2,
//                           },
//                         },
//                       },
//                       claim_arguments: {
//                         fields: {
//                           eth_address: {
//                             type: "bytes",
//                             id: 1,
//                             options: {
//                               "(btype)": "HEX",
//                             },
//                           },
//                           koin_address: {
//                             type: "bytes",
//                             id: 2,
//                             options: {
//                               "(btype)": "ADDRESS",
//                             },
//                           },
//                           signature: {
//                             type: "bytes",
//                             id: 3,
//                           },
//                         },
//                       },
//                       claim_result: {
//                         fields: {},
//                       },
//                       get_info_arguments: {
//                         fields: {},
//                       },
//                       get_info_result: {
//                         fields: {
//                           value: {
//                             type: "claim_info",
//                             id: 1,
//                           },
//                         },
//                       },
//                       check_claim_arguments: {
//                         fields: {
//                           eth_address: {
//                             type: "bytes",
//                             id: 1,
//                             options: {
//                               "(btype)": "HEX",
//                             },
//                           },
//                         },
//                       },
//                       check_claim_result: {
//                         fields: {
//                           value: {
//                             type: "claim_status",
//                             id: 1,
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     provider,
//   });
// }

// export const consultGeneralInfo = async () => {
//   try {
//     const claimContract = await getClaimContract(provider).functions;

//     const { result } = await claimContract.get_info({});
//     // totalEthAccounts = info.total_eth_accounts;
//     // ethAccountsClaimed = info.eth_accounts_claimed;

//     const totalKoin = Number(
//       utils.formatUnits(result?.value.claim_info.total_koin, 8)
//     ).toLocaleString("en-US", { maximumFractionDigits: 8 });

//     const koinClaimed = Number(
//       utils.formatUnits(result?.value.claim_info.koin_claimed, 8)
//     ).toLocaleString("en-US", { maximumFractionDigits: 8 });

//     return { totalKoin, koinClaimed };
//   } catch (error) {
//     throw new Error(`General info error: ${error}`);
//   }
// };
