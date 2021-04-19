import { atom } from "recoil";

export const openSidebar = atom<boolean>({
  key: "open-sidebar",
  default: false,
});

export const mainNav = atom<boolean>({
  key: "show-main-nav",
  default: false,
});
