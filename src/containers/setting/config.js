import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "settings",
  add: "settingsNew",
  edit: "settingEdit",
  show: "settingsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "show-settings"],
    add: [{ method: "post", params: {} }, "update-settings"],
    edit: [{ method: "put", params: {} }, "update-settings"],
    show: [{ method: "get", params: {} }, "update-settings/"],
    // delete: [{ method: "delete", params: {} }, "update-settings/"],
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
