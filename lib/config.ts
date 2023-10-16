const MAINNET_CHAIN_ID = "EiBZK_GGVP0H_fXVAM3j6EAuz3-B-l3ejxRSewi7qIBfSA==";
const HARBINGER_CHAIN_ID = "EiBncD4pKRIQWco_WRqo5Q-xnXR7JuO3PtZv983mKdKHSQ==";
const CHAIN_ID = process.env.VITE_CHAIN_ID || MAINNET_CHAIN_ID; // Chain ID of the network to connect to

const getDefaultApiNodes = () => {
  if (CHAIN_ID === HARBINGER_CHAIN_ID) {
    return ["https://harbinger-api.koinos.io"];
  }
  return ["https://api.koinosblocks.com", "https://api.koinos.io"];
};

export const config = {
  HARBINGER_CHAIN_ID,
  MAINNET_CHAIN_ID,
  CHAIN_ID,
  GIT_COMMIT_HASH: process.env.VITE_GIT_COMMIT_HASH || "dev", // Git commit hash of the build
  DEFAULT_API_NODES: getDefaultApiNodes(),
  SWITCH_TO_NETWORK_NAME:
    CHAIN_ID == HARBINGER_CHAIN_ID ? "Mainnet" : "Harbinger",
  SWITCH_TO_NETWORK_URL:
    CHAIN_ID == HARBINGER_CHAIN_ID
      ? "https://koinosblocks.com"
      : "https://harbinger.koinosblocks.com",
  NICKNAMES_CONTRACT_ID:
    CHAIN_ID === HARBINGER_CHAIN_ID
      ? "1AuJQxqqyBZXqqugTQZzXRVRmEYJtsMYQ8"
      : "1KD9Es7LBBjA1FY3ViCgQJ7e6WH1ipKbhz",
};
