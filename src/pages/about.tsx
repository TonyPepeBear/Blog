import * as React from "react";
import { Helmet } from "react-helmet";
import ReadMoreButton from "../components/read-more-button";

const AboutPage = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          "https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/3ee20d4c-0659-4965-c94f-592a7fdfff00/blursm" +
          ")",
      }}
      className="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover font-serif"
    >
      <div className="bg-white p-3 rounded-xl shadow-md">
        <div className="p-2 w-4/5vw lg:w-cardlg text-xl max-h-4/5vh overflow-y-auto">
          <img
            src="https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/e1f21e2c-10fc-4c41-87ba-557d048b8300/public"
            className="rounded-full h-40 w-40"
          />
          <h2 className="text-4xl py-3">TonyPepe</h2>
          <p className="py-4">記錄各種自己掉進去的坑</p>
          <div>
            學歷：
            <ul className="pl-6 list-disc list-inside">
              <li>逢甲大學 資訊工程學系</li>
            </ul>
          </div>
          <div className="h-8" />
          <ReadMoreButton href="/" title="Go Home" />
        </div>
      </div>
      <Helmet title="About - TonyPepe" />
    </div>
  );
};

export default AboutPage;
