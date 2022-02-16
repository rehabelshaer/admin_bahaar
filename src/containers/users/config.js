import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "users",
  add: "usersNew",
  edit: "usersEdit",
  show: "usersShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "users"],
    add: [{ method: "post", params: {} }, "users"],
    edit: [{ method: "put", params: {} }, "users/"],
    show: [{ method: "get", params: {} }, "users/"],
    delete: [{ method: "delete", params: {} }, "users/"],
  },
  routes: {
    index: `${privateSub}/${routes[pages.index]?.path}`,
    indexTitle: pages.index.replace(/([a-z])([A-Z])/g, "$1 $2"),
    indexKey: "home",
    add: `${privateSub}/${routes[pages.add]?.path}`,
    edit: `${privateSub}/${routes[pages.edit]?.path.slice(
      0,
      routes[pages.edit].path.length - 3
    )}`,
    show: `${privateSub}/${routes[pages.show]?.path.slice(
      0,
      routes[pages.show]?.path.length - 3
    )}`,
  },
  titles: {
    add: "Create",
    edit: "global.edit",
    show: "Details",
  },
};
// export const isActive = {
//   1: "active",
//   0: "not active",
// };
export const status = {
  2: { nameEn: "Approved", nameAr: "موافق ", color: "green" },
  3: { nameEn: "Rejected", nameAr: "مرفوض", color: "red" },
};
export default config;
