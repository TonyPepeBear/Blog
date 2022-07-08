import * as React from "react";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";
import homeAltOutline from "@iconify/icons-ant-design/home-fill";
import githubOutlined from "@iconify/icons-ant-design/github-outlined";
import roundSchool from "@iconify/icons-ic/round-school";
import TagList from "../components/tag-list";

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
          <a href="/">
            <img
              src="https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/e1f21e2c-10fc-4c41-87ba-557d048b8300/public"
              className="rounded-full h-40 w-40"
            />
          </a>
          <div className="flex py-5">
            <h2 className="text-4xl">TonyPepe</h2>
            <h3 className="px-3 text-gray-600 italic text-sm self-end">
              Tony Cheng
            </h3>
          </div>
          <p className="pb-4">記錄各種自己掉進去的坑</p>
          {/* 學歷 */}
          <div>
            學歷：
            <ul className="pl-6 list-disc list-inside text-lg">
              <li>逢甲大學 資訊工程學系</li>
            </ul>
          </div>
          {/* 經歷 */}
          <div>
            經歷：
            <ul className="pl-6 list-disc list-inside text-lg">
              <li>逢甲大學 iOS Club 4th 教學長</li>
              <li>逢甲大學 iOS Club 5th 技術長</li>
              <li>逢甲大學 iOS Club 6th 網管</li>
            </ul>
          </div>
          {/* Tag List */}
          <div className="py-3">
            <TagList tags={tags} showIcon={false} />
          </div>
          {/* Icons */}
          <div className="flex gap-5">
            <a href="/">
              <Icon icon={homeAltOutline} width={40} height={40} />
            </a>
            <a href="https://github.com/tonypepebear" target="_blank">
              <Icon icon={githubOutlined} width={40} height={40} />
            </a>
            <a href="https://iosclub.tw" target="_blank">
              <Icon icon={roundSchool} width={40} height={40} />
            </a>
          </div>
          {/* Location */}
          <p className="py-3 text-gray-500 text-right italic">Taipei, Taiwan</p>
        </div>
      </div>
      <Helmet title="About - TonyPepe" />
    </div>
  );
};

const tags = [
  "Java",
  "Kotlin",
  "Python",
  "Swift",
  "Go",
  "JS",
  "Android",
  "iOS",
  "SQL",
  "Web",
  "Flutter",
];

export default AboutPage;
