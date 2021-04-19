import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { openSidebar } from "../../states/dashboardStates";
import { adminSidebarLinks, sideBarLinks } from "../../utils/constantsArray";
import SvgIcon from "../shared/SvgIcon";

interface SidebarProps {
  role?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const router = useRouter();
  let links = sideBarLinks;
  if (role === "admin") {
    links = adminSidebarLinks;
  }
  const [openSidebarValue, setSidebarValue] = useRecoilState(openSidebar);
  return (
    <div
      className={`${
        openSidebarValue ? "block" : "hidden"
      } md:block md:col-span-1 bg-gray-100 text-gray-600`}
    >
      <button
        onClick={() => setSidebarValue(false)}
        className={`${
          openSidebarValue ? "block" : "hidden"
        } md:hidden p-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-1`}
      >
        <SvgIcon
          d={`M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z`}
        />
      </button>

      <div className="cursor-pointer py-2 lg:py-3">
        {/* <Link href="/"> */}
        <Image
          src={`/new-logo.png`}
          alt="Icon"
          width="231"
          height="100"
          layout="responsive"
          className="object-contain"
        ></Image>
        {/* </Link> */}
      </div>

      <div className="flex-col uppercase">
        {links.map((link) => {
          return (
            <div
              className={`p-3 font-semibold text-base my-4 cursor-pointer border-l-4 border-solid hover:bg-primary hover:border-blue-400 hover:text-gray-100 ${
                router.pathname.includes(link.href)
                  ? "bg-primary border-blue-400 text-gray-100"
                  : "border-transparent"
              } transition duration-500 ease-in-out`}
              key={link.label}
            >
              <Link href={link.href} key={link.label}>
                <div
                  onClick={() => setSidebarValue(false)}
                  className="flex items-center"
                >
                  <svg
                    className="w-5 h-5 inline-block mx-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={link.svgD}
                    />
                  </svg>
                  <span>{link.label}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
