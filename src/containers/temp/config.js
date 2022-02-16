import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "requestTypes",
  add: "requestTypesNew",
  edit: "requestTypesEdit",
  show: "requestTypesShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "requestTypes"],
    add: [{ method: "post", params: {} }, "requestTypes"],
    edit: [{ method: "put", params: {} }, "requestTypes/"],
    show: [{ method: "get", params: {} }, "requestTypes/"],
    delete: [{ method: "delete", params: {} }, "requestTypes/"],
  },
  routes: {
    index: `${privateSub}/${routes[pages.index]?.path}`,
    indexTitle: pages.index,
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
    add: "create",
    edit: "global.edit",
    show: "Details",
  },
};
export default config;
