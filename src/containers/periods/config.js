import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "periods",
  add: "periodsNew",
  edit: "periodsEdit",
  show: "periodsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "periods"],
    add: [{ method: "post", params: {} }, "periods"],
    edit: [{ method: "put", params: {} }, "periods/"],
    show: [{ method: "get", params: {} }, "periods/"],
    delete: [{ method: "delete", params: {} }, "periods/"],
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
