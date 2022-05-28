import * as React from "react";
import { Helmet } from "react-helmet";
import { Icon } from "@iconify/react";

export default function Navbar({ title = "TonyPepe" }: Props) {
  return (
    <aside className="lg:w-96 p-3 bg-gray-700 lg:sticky lg:h-screen lg:top-0 lg:block grid grid-cols-2 justify-items-center items-center h-fit">
      <Helmet title={title} />
      <img
        src="https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/cfccf3e2-7fd5-4e6c-adcb-a3cc5064f900/public"
        className="rounded-full lg:h-auto lg:w-full h-40 w-40"
      />
      <nav className="lg:pt-5 flex flex-col gap-5 lg:gap-8 text-gray-300 h-full lg:h-autl">
        {NavbarItems.map((items, index) => {
          const space = index != 0 && (
            <div className="flex-grow lg:hidden"></div>
          );
          return [
            space,
            <a
              href={items.path}
              className="flex px-8 text-xl lg:text-2xl items-center gap-3 lg:gap-4"
            >
              <Icon icon={items.icon} />
              <p className="font-bold truncate w-full">{items.name}</p>
            </a>,
          ];
        })}
      </nav>
    </aside>
  );
}

interface Props {
  title?: string;
}

const NavbarItems = [
  {
    name: "Home",
    path: "/",
    icon: "ant-design:home-filled",
  },
  {
    name: "Search",
    path: "/search",
    icon: "fa:search",
  },
  {
    name: "About",
    path: "/about",
    icon: "mdi:human-greeting-variant",
  },
];