import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "Regions",
  add: "RegionsNew",
  edit: "RegionsEdit",
  show: "RegionsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "regions"],
    add: [{ method: "post", params: {} }, "regions"],
    edit: [{ method: "put", params: {} }, "regions/"],
    show: [{ method: "get", params: {} }, "regions/"],
    delete: [{ method: "delete", params: {} }, "regions/"],
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
export default config;
