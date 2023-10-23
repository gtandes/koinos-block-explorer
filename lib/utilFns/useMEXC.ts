import axios from "axios";

const fetchMEXCData = async () => {
  const response = await axios.get(
    "https://www.mexc.com/open/api/v2/market/ticker?symbol=koin_usdt"
  );

  // console.log(response);

  return response.data;
};

const data = await fetchMEXCData();
export const mexcKoinLastPrice = parseFloat(data.data[0].last);
