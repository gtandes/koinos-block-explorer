import { useQuery } from "@tanstack/react-query";

export function fetchMarketData() {
  return fetch(
    "https://www.mexc.com/open/api/v2/market/ticker?symbol=koin_usdt"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => data.last);
}
