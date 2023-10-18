import { Contract, Provider, utils } from "koilib";

const provider = new Provider("https://api.koinos.io");

// export const getBurned = async () => {
//   const vhpContract = new Contract({
//     id: "18tWNU7E4yuQzz7hMVpceb9ixmaWLVyQsr",
//     abi: utils.tokenAbi,
//     provider,
//   });

//   const vhp = vhpContract.functions;

//   // Get supply
//   const { result: vhpSupply } = await vhp.supply();

//   // format the value with  8 decimals
//   const { result: decimalsRes } = await vhp.decimals();

//   const formattedBurnedAmount = utils.formatUnits(
//     vhpSupply?.value,
//     decimalsRes?.value
//   );

//   console.log(formattedBurnedAmount);
//   return formattedBurnedAmount;
// };

export const getNetworkHeight = async () => {
  // explore the promise that this returns; topology has the height of the entire network
  const { head_topology } = await provider.getHeadInfo();
  return head_topology.height;
};
