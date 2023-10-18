"use client";

import { transactionStore } from "@/store/TransactionStore";

export default function page() {
  const { accountTransactionHistory } = transactionStore();
  // console.log(accountTransactionHistory);

  return (
    <html>
      <body>
        <section className="relative flex flex-col items-center justify-center w-full h-[100vh] overflow-y-auto overflow-x-hidden">
          {accountTransactionHistory.map((transaction, index) => (
            <div key={index} className="w-full h-full text-black text-[10px]">
              {JSON.stringify(transaction)}
            </div>
          ))}
        </section>
      </body>
    </html>
  );
}
