import { parse, Root, Type } from "protobufjs";
import { useClient } from "./useClient";
import * as koinosPbToProto from "@roamin/koinos-pb-to-proto";
import { ProtoDescriptor } from "@roamin/koinos-pb-to-proto";
import { utils } from "koilib";

export type ContractMeta = {
  abi: any | null;
  root: Root | null;
  protos: ProtoDescriptor[] | null;
};

export function useContract() {
  const { client } = useClient();

  const fetchContractMeta = async (
    contractId: string
  ): Promise<ContractMeta | undefined> => {
    try {
      const response = await client?.contractMetaStore.getContractMeta(
        contractId
      );

      if (response) {
        const { meta } = response;
        const abi = JSON.parse(meta.abi);
        const protos = koinosPbToProto.convert(abi.types);
        const root = parseProtos(protos);
        return {
          abi,
          root,
          protos,
        };
      }
    } catch (e) {
      return undefined;
    }
  };

  const parseProtos = (protos: ProtoDescriptor[]): Root => {
    const root = new Root();
    for (const proto of protos) {
      try {
        parse(proto.definition, root, { keepCase: true });
      } catch (e) {
        continue;
      }
    }
    return root;
  };

  // TODO make it recursive
  const normalize = (type: Type, decoded: any): any => {
    const normalized: any = {};
    for (const name of Object.keys(type.fields)) {
      const field = type.fields[name];

      if (field.type !== "bytes" || !field.options) {
        normalized[field.name] = decoded[field.name];
        continue;
      }

      switch (field.options["(koinos.btype)"]) {
        case "BASE58":
        case "CONTRACT_ID":
        case "ADDRESS":
          normalized[field.name] = utils.encodeBase58(decoded[field.name]);
          break;
        case "BASE64":
          normalized[field.name] = utils.encodeBase64url(decoded[field.name]);
          break;
        case "HEX":
        case "BLOCK_ID":
        case "TRANSACTION_ID":
          normalized[field.name] = `0x${utils.toHexString(
            decoded[field.name]
          )}`;
          break;
        default:
          normalized[field.name] = decoded[field.name];
      }
    }
    return normalized;
  };

  const encodeArgs = (root: Root, type: string, input: any): string => {
    if (type == "") {
      return "";
    }
    const inputType = root.lookupType(type);
    const message = inputType.create(input);
    return utils.encodeBase64url(
      Buffer.from(inputType.encode(message!).finish())
    );
  };

  const decodeResult = (root: Root, type: string, result: string): any => {
    if (type == "") {
      return result;
    }
    const buffer = utils.decodeBase64url(result);
    return root.lookupType(type).decode(buffer).toJSON();
  };

  return {
    fetchContractMeta,
    normalize,
    encodeArgs,
    decodeResult,
  };
}
