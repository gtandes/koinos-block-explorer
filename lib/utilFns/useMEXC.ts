import axios from "axios";

// const fetchMEXCData = async () => {
//   const response = await axios.get(
//     "https://www.mexc.com/open/api/v2/market/ticker?symbol=koin_usdt"
//   );

//   // console.log(response);

//   return response.data;
// };

export const fetchCoingeckoData = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=koinos&vs_currencies=usd"
  );

  return response.data;
};

const data = await fetchCoingeckoData();

// via mexc
// const koinLastPrice = parseFloat(data.data[0].last);

// via coingecko
export const koinLastPrice = parseFloat(data.koinos.usd);

// export default mexcKoinLastPrice;
