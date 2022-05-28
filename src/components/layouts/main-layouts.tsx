import * as React from "react";
import Footer from "../footer";
import Navbar from "../navbar";

interface Props {
  children: JSX.Element;
  title?: string;
}

export default function MainLayout({ children, title = "TonyPepe" }: Props) {
  return (
    <div className="font-serif">
      <div className="bg-gray-400 flex flex-col lg:flex-row">
        <Navbar />
        <main className="px-10 w-full">
          <div className="h-10" />
          {children}
          <div className="h-10" />
        </main>
        <div className="xl:w-52" />
      </div>
      <Footer />
    </div>
  );
}
