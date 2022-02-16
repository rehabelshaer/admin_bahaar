import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "ContactTypes",
  add: "ContactTypesNew",
  edit: "ContactTypesEdit",
  show: "ContactTypesShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "contact_types"],
    add: [{ method: "post", params: {} }, "contact_types"],
    edit: [{ method: "put", params: {} }, "contact_types/"],
    show: [{ method: "get", params: {} }, "contact_types/"],
    delete: [{ method: "delete", params: {} }, "contact_types/"],
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
    add: "create",
    edit: "global.edit",
    show: "Details",
  },
};
export default config;
