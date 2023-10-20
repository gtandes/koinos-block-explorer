import AcctOwnerInfo from "@/components/SearchPage/AcctOwnerInfo";
import TokenCountCard from "@/components/SearchPage/TokenCountCard";
import TotalBalanceCard from "@/components/SearchPage/TotalBalanceCard";
import TransactionHistory from "@/components/SearchPage/TransactionHistory";

export default function page() {
  return (
    <section className="relative z-[5] flex flex-col items-center justify-start w-full h-[100vh] overflow-hidden backdrop-blur-sm">
      <AcctOwnerInfo />

      <div className="flex items-center justify-start gap-[24px] text-left text-base text-white font-inter mb-4">
        <TotalBalanceCard />
        <TokenCountCard />
      </div>

      <TransactionHistory />
    </section>
  );
}
