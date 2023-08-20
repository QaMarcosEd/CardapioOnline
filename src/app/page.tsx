"use client";

import Categories from "./components/Categories";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex flex-col justify-cente">
      <Header />
      <Categories />
    </main>
  );
}
