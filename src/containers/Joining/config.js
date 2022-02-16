import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "joiningRequests",
  add: "joiningRequestsNew",
  edit: "joiningRequestsEdit",
  show: "joiningRequestsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "joining_requests"],
    add: [{ method: "post", params: {} }, "joining_requests"],
    edit: [{ method: "put", params: {} }, "joining_requests/"],
    show: [{ method: "get", params: {} }, "joining_requests/"],
    delete: [{ method: "delete", params: {} }, "joining_requests/"],
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
