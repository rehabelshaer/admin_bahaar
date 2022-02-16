import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "services",
  add: "servicesNew",
  edit: "servicesEdit",
  show: "servicesShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "services"],
    add: [{ method: "post", params: {} }, "services"],
    edit: [{ method: "put", params: {} }, "services/"],
    show: [{ method: "get", params: {} }, "services/"],
    delete: [{ method: "delete", params: {} }, "services/"],
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
export const isActive = {
  1: "active",
  0: "not active",
};
export default config;
