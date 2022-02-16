import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "cancelStrategy",
  add: "cancelStrategyNew",
  edit: "cancelStrategyEdit",
  show: "cancelStrategyShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "cancel_strategies"],
    // add: [{ method: "post", params: {} }, "update-cancel-strategy"],
    edit: [{ method: "put", params: {} }, "update-cancel-strategy/"],
    show: [{ method: "get", params: {} }, "show-cancel-strategy/"],
    // delete: [{ method: "delete", params: {} }, "countries/"],
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
