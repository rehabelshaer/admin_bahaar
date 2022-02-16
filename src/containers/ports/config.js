import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "ports",
  add: "portsNew",
  edit: "portsEdit",
  show: "portsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "ports"],
    add: [{ method: "post", params: {} }, "ports"],
    edit: [{ method: "put", params: {} }, "ports/"],
    show: [{ method: "get", params: {} }, "ports/"],
    delete: [{ method: "delete", params: {} }, "ports/"],
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
    add: "provenance.create",
    edit: "global.edit",
    show: "Details",
  },
};
export default config;
