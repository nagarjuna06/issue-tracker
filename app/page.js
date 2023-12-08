"use client";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Promotion from "@/components/Home/Promotion";
import Uses from "@/components/Home/Uses";

export default function Home() {
  return (
    <main>
      <Promotion />
      <Uses />
      <Features />
      <Footer />
    </main>
  );
}
