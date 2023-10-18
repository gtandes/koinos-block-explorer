import AcctOwnerInfo from "@/components/LandingPage/AcctOwnerInfo";
import TokenCountCard from "@/components/LandingPage/TokenCountCard";
import TotalBalanceCard from "@/components/LandingPage/TotalBalanceCard";
import TransactionHistory from "@/components/LandingPage/TransactionHistory";

export default function page() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-almost-black w-full h-[100vh] overflow-hidden">
      <AcctOwnerInfo />

      <div className="flex items-center justify-start gap-[24px] text-left text-base text-white font-inter mb-4">
        <TotalBalanceCard />
        <TokenCountCard />
      </div>

      <TransactionHistory />
    </section>
  );
}
