import { routes } from "../Dashboard/DashboardRoutes";
import { privateSub } from "../../router";

const pages = {
  index: "viewRequests",
  add: "viewRequestsNew",
  edit: "viewRequestsEdit",
  show: "viewRequestsShow",
};
const config = {
  api: {
    index: [{ method: "get", params: {} }, "viewRequests"],
    add: [{ method: "post", params: {} }, "viewRequests"],
    edit: [{ method: "put", params: {} }, "viewRequests/"],
    show: [{ method: "get", params: {} }, "viewRequest/"],
    delete: [{ method: "delete", params: {} }, "viewRequests/"],
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

export const status = {
  1: { nameEn: "Pending", nameAr: "معلق", color: "orange" },
  2: { nameEn: "Under Review", nameAr: "قيد المراجهة", color: "blue" },
  3: { nameEn: "Under Approval", nameAr: "قيد الموافقة", color: "cyan" },
  4: { nameEn: "Approved", nameAr: "موافق ", color: "green" },
  5: { nameEn: "Rejected", nameAr: "مرفوض", color: "red" },
};
export default config;
