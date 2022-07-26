import { Adsense } from "@ctrl/react-adsense";
import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../footer";
import Navbar from "../navbar";

interface Props {
  children: JSX.Element;
  title?: string;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="font-serif">
      <div className="bg-gray-400 flex flex-col lg:flex-row">
        <Navbar />
        <main className="px-2 lg:px-10 flex-grow w-full min-w-0">
          <div className="h-10" />
          {children}
          <div className="h-10" />
          {/* google analytics */}
          <Helmet>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-FVGT5FB0W4"
            />
            <script src="/g-analytics.js" />
          </Helmet>
          <Adsense
            style={{ display: "block" }}
            client="ca-pub-1667006488909532"
            slot="4929923749"
            format="auto"
            responsive="true"
          />
        </main>
        <div className="xl:w-52" />
      </div>
      <Footer />
    </div>
  );
}
