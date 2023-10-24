import axios from "axios";

export const fetchCoingeckoData = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=koinos&vs_currencies=usd"
  );

  return response.data;
};
