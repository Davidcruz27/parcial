import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="bg-white">
        <Header />
        <Hero />
      </div>
    </div>
  );
}

export default HomePage;
