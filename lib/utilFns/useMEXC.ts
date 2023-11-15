import axios from "axios";

export const fetchMEXCData = async () => {
  const response = await axios.get(
    "https://www.mexc.com/open/api/v2/market/ticker?symbol=koin_usdt"
  );

  return response.data;
};
