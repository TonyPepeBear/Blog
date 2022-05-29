import * as React from "react";
import { Icon } from "@iconify/react";
import githubOutlined from "@iconify/icons-ant-design/github-outlined";
import flagTaiwan from "@iconify/icons-twemoji/flag-taiwan";
import roundSchool from "@iconify/icons-ic/round-school";

export default function Footer() {
  return (
    <footer className="h-96 w-full bg-gray-600">
      <div className="grid grid-col grid-col-4 items-center justify-center py-10 px-5 h-full">
        <div />
        <div className="flex items-center justify-center text-3xl">
          <img
            className="w-16 h-16"
            src="https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/ed643a0b-13e5-4fd1-de6e-4cd550300f00/public"
          />
          <div className="w-2" />
          TonyPepe
        </div>
        <div className="lg:text-xl">Made with Love in Taiwan</div>
        <div className="flex justify-center gap-5 lg:gap-8">
          <a href="https://github.com/tonypepebear" target="_blank">
            <Icon icon={githubOutlined} width={40} height={40} />
          </a>
          <a
            href="https://www.wikiwand.com/zh-tw/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B"
            target="_blank"
          >
            <Icon icon={flagTaiwan} width={40} height={40} />
          </a>
          <a href="https://iosclub.tw" target="_blank">
            <Icon icon={roundSchool} width={40} height={40} />
          </a>
        </div>
      </div>
    </footer>
  );
}
