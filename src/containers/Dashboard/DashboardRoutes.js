import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
// import Loader from "@iso/components/utility/loader";
import Loader from "@iso/Mcomponents/extended/Loader/Loader";
import { getPermissions } from "@iso/config/permissions";
// read: 1, update: 1 ,delete ,  create: 1
const routes = {
  home: {
    path: "",
    component: lazy(() => import("@iso/containers/Home/index")),
    exact: true,
    // dynamic permission to make route available or not true or false
    show: true,
  },

  ///  countries
  Countries: {
    path: "Countries",
    component: lazy(() => import("@iso/containers/Countries/index")),
    exact: true,
    show: getPermissions("countries", "read"),
  },
  CountriesNew: {
    path: "Countries/new-Countries",
    component: lazy(() => import("@iso/containers/Countries/add")),
    exact: true,
    show: getPermissions("countries", "create"),
  },
  CountriesEdit: {
    path: "Countries/edit-Countries/:id",
    component: lazy(() => import("@iso/containers/Countries/add")),
    exact: true,
    show: getPermissions("countries", "update"),
  },
  CountriesShow: {
    path: "Country/:id",
    component: lazy(() => import("@iso/containers/Countries/details")),
    exact: true,
    show: getPermissions("countries", "read"),
  },

  ///  cities
  Cities: {
    path: "Cities",
    component: lazy(() => import("@iso/containers/Cities/index")),
    exact: true,
    show: getPermissions("cities", "read"),
  },
  CitiesNew: {
    path: "City/new-city",
    component: lazy(() => import("@iso/containers/Cities/add")),
    exact: true,
    show: getPermissions("cities", "create"),
  },
  CitiesEdit: {
    path: "City/edit-city/:id",
    component: lazy(() => import("@iso/containers/Cities/add")),
    exact: true,
    show: getPermissions("cities", "update"),
  },
  CitiesShow: {
    path: "City/:id",
    component: lazy(() => import("@iso/containers/Cities/details")),
    exact: true,
    show: getPermissions("cities", "read"),
  },
  ///  area
  Regions: {
    path: "Regions",
    component: lazy(() => import("@iso/containers/Regions/index")),
    exact: true,
    show: getPermissions("regions", "read"),
  },
  RegionsNew: {
    path: "Regions/new-region",
    component: lazy(() => import("@iso/containers/Regions/add")),
    exact: true,
    show: getPermissions("regions", "create"),
  },
  RegionsEdit: {
    path: "Regions/edit-region/:id",
    component: lazy(() => import("@iso/containers/Regions/add")),
    exact: true,
    show: getPermissions("regions", "update"),
  },
  RegionsShow: {
    path: "Regions/:id",
    component: lazy(() => import("@iso/containers/Regions/details")),
    exact: true,
    show: getPermissions("regions", "read"),
  },

  // permission
  permissions: {
    path: "permissions",
    component: lazy(() => import("@iso/containers/permissions")),
    exact: true,
    show: getPermissions("permissions", "read"),
  },
  permissionsNew: {
    path: "permissions/new-permission",
    component: lazy(() => import("@iso/containers/permissions/add")),
    exact: true,
    show: getPermissions("permissions", "create"),
  },
  permissionsEdit: {
    path: "permissions/edit-permission/:id",
    component: lazy(() => import("@iso/containers/permissions/add")),
    exact: true,
    show: getPermissions("permissions", "update"),
  },
  permissionsShow: {
    path: "permissions/:id",
    component: lazy(() => import("@iso/containers/permissions/details")),
    exact: true,
    show: getPermissions("permissions", "read"),
  },

  // admins: {
  //   path: "admins",
  //   component: lazy(() => import("@iso/containers/admins")),
  //   exact: true,
  //   show: getPermissions("admins", "read"),
  // },
  // adminsNew: {
  //   path: "admins/new-admin",
  //   component: lazy(() => import("@iso/containers/admins/add")),
  //   exact: true,
  //   show: getPermissions("admins", "create"),
  // },
  // adminsEdit: {
  //   path: "admins/edit-admin/:id",
  //   component: lazy(() => import("@iso/containers/admins/add")),
  //   exact: true,
  //   show: getPermissions("admins", "update"),
  // },
  // adminsShow: {
  //   path: "admins/:id",
  //   component: lazy(() => import("@iso/containers/admins/details")),
  //   exact: true,
  //   show: getPermissions("admins", "read"),
  // },



  users: {
    path: "users",
    component: lazy(() => import("@iso/containers/users")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  usersNew: {
    path: "users/new-user",
    component: lazy(() => import("@iso/containers/users/add")),
    exact: true,
    show: getPermissions("users", "create"),
  },
  usersEdit: {
    path: "users/edit-user/:id",
    component: lazy(() => import("@iso/containers/users/add")),
    exact: true,
    show: getPermissions("users", "update"),
  },
  usersShow: {
    path: "users/:id",
    component: lazy(() => import("@iso/containers/users/details")),
    exact: true,
    show: getPermissions("users", "read"),
  },

  ////
  joiningRequests: {
    path: "Joining",
    component: lazy(() => import("@iso/containers/Joining")),
    exact: true,
    show: getPermissions("requests", "joining"),
  },
  joiningRequestsNew: {
    path: "Joining/new-Joining",
    component: lazy(() => import("@iso/containers/Joining/add")),
    exact: true,
    show: getPermissions("requests", "joining"),
  },
  joiningRequestsEdit: {
    path: "Joining/edit-Joining/:id",
    component: lazy(() => import("@iso/containers/Joining/edit")),
    exact: true,
    show: getPermissions("requests", "joining"),
  },
  joiningRequestsShow: {
    path: "Joining/:id",
    component: lazy(() => import("@iso/containers/users/details")),
    exact: true,
    show: getPermissions("requests", "joining"),
  },
  ///

  //categories//
  categories: {
    path: "categories",
    component: lazy(() => import("@iso/containers/categories")),
    exact: true,
    show: getPermissions("categories", "read"),
  },
  categoriesNew: {
    path: "categories/new-categories",
    component: lazy(() => import("@iso/containers/categories/add")),
    exact: true,
    show: getPermissions("categories", "create"),
  },
  categoriesEdit: {
    path: "categories/edit-admin/:id",
    component: lazy(() => import("@iso/containers/categories/add")),
    exact: true,
    show: getPermissions("categories", "update"),
  },
  categoriesShow: {
    path: "categories/:id",
    component: lazy(() => import("@iso/containers/categories/details")),
    exact: true,
    show: getPermissions("categories", "read"),
  },

  //services//
  services: {
    path: "services",
    component: lazy(() => import("@iso/containers/services")),
    exact: true,
    show: getPermissions("services", "read"),
  },
  servicesNew: {
    path: "services/new-admin",
    component: lazy(() => import("@iso/containers/services/add")),
    exact: true,
    show: getPermissions("services", "create"),
  },
  servicesEdit: {
    path: "services/edit-admin/:id",
    component: lazy(() => import("@iso/containers/services/edit")),
    exact: true,
    show: getPermissions("services", "update"),
  },
  servicesShow: {
    path: "services/:id",
    component: lazy(() => import("@iso/containers/services/details")),
    exact: true,
    show: getPermissions("services", "read"),
  },
  //
  additions: {
    path: "additions",
    component: lazy(() => import("@iso/containers/additions")),
    exact: true,
    show: getPermissions("additions", "read"),
  },
  additionsNew: {
    path: "additions/new-additions",
    component: lazy(() => import("@iso/containers/additions/add")),
    exact: true,
    show: getPermissions("additions", "create"),
  },
  additionsEdit: {
    path: "additions/edit-additions/:id",
    component: lazy(() => import("@iso/containers/additions/add")),
    exact: true,
    show: getPermissions("additions", "update"),
  },
  additionsShow: {
    path: "additions/:id",
    component: lazy(() => import("@iso/containers/additions/details")),
    exact: true,
    show: getPermissions("additions", "read"),
  },
  //

  //nationalities
  nationalities: {
    path: "nationalities",
    component: lazy(() => import("@iso/containers/nationalities")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  nationalitiesNew: {
    path: "nationalities/new-nationalities",
    component: lazy(() => import("@iso/containers/nationalities/add")),
    exact: true,
    show: getPermissions("users", "create"),
  },
  nationalitiesEdit: {
    path: "nationalities/edit-nationalities/:id",
    component: lazy(() => import("@iso/containers/nationalities/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  nationalitiesShow: {
    path: "nationalities/:id",
    component: lazy(() => import("@iso/containers/nationalities/details")),
    exact: true,
    show: getPermissions("users", "read"),
  },

  //ports
  ports: {
    path: "ports",
    component: lazy(() => import("@iso/containers/ports")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  portsNew: {
    path: "ports/new-ports",
    component: lazy(() => import("@iso/containers/ports/add")),
    exact: true,
    show: getPermissions("admins", "create"),
  },
  portsEdit: {
    path: "ports/edit-ports/:id",
    component: lazy(() => import("@iso/containers/ports/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  portsShow: {
    path: "ports/:id",
    component: lazy(() => import("@iso/containers/ports/details")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  //
  //periods
  periods: {
    path: "periods",
    component: lazy(() => import("@iso/containers/periods")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  periodsNew: {
    path: "periods/new-periods",
    component: lazy(() => import("@iso/containers/periods/add")),
    exact: true,
    show: getPermissions("users", "create"),
  },
  periodsEdit: {
    path: "periods/edit-periods/:id",
    component: lazy(() => import("@iso/containers/periods/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  periodsShow: {
    path: "periods/:id",
    component: lazy(() => import("@iso/containers/periods/details")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  //staff
  staff: {
    path: "staff",
    component: lazy(() => import("@iso/containers/staff")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  staffsShow: {
    path: "staff/:id",
    component: lazy(() => import("@iso/containers/staff/details")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  //
  //contactUs
  ContactUs: {
    path: "ContactUs",
    component: lazy(() => import("@iso/containers/ContactUs")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  //setting
  settings: {
    path: "settings",
    component: lazy(() => import("@iso/containers/setting/add")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  settingEdit: {
    path: "setting/edit-setting/:id",
    component: lazy(() => import("@iso/containers/setting/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  settingShow: {
    path: "setting/:id",
    component: lazy(() => import("@iso/containers/setting/details")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  //cancelStrategy
  cancelStrategy: {
    path: "cancelStrategy",
    component: lazy(() => import("@iso/containers/cancelStrategy")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  cancelStrategyEdit: {
    path: "edit-cancelStrategy/:id",
    component: lazy(() => import("@iso/containers/cancelStrategy/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  //vehicles
  vehicle: {
    path: "vehicle",
    component: lazy(() => import("@iso/containers/vehicle")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  vehicleShow: {
    path: "vehicle/:id",
    component: lazy(() => import("@iso/containers/vehicle/details")),
    exact: true,
    show: getPermissions("users", "read"),
  },
  //

  roles: {
    path: "roles",
    component: lazy(() => import("@iso/containers/roles")),
    exact: true,
    show: getPermissions("roles", "read"),
  },
  rolesNew: {
    path: "roles/new-role",
    component: lazy(() => import("@iso/containers/roles/add")),
    exact: true,
    show: getPermissions("roles", "create"),
  },
  rolesEdit: {
    path: "roles/edit-role/:id",
    component: lazy(() => import("@iso/containers/roles/add")),
    exact: true,
    show: getPermissions("roles", "update"),
  },
  rolesShow: {
    path: "roles/:id",
    component: lazy(() => import("@iso/containers/roles/details")),
    exact: true,
    show: getPermissions("roles", "read"),
  },
  ///

  /// ContactTypes
  ContactTypes: {
    path: "ContactTypes",
    component: lazy(() => import("@iso/containers/ContactTypes")),
    exact: true,
    show: getPermissions("admins", "read"),
  },
  ContactTypesNew: {
    path: "ContactTypes/new-ContactTypes",
    component: lazy(() => import("@iso/containers/ContactTypes/add")),
    exact: true,
    show: getPermissions("admins", "create"),
  },
  ContactTypesEdit: {
    path: "ContactTypes/edit-ContactTypes/:id",
    component: lazy(() => import("@iso/containers/ContactTypes/add")),
    exact: true,
    show: getPermissions("admins", "update"),
  },
  ContactTypesShow: {
    path: "ContactTypes/:id",
    component: lazy(() => import("@iso/containers/ContactTypes/details")),
    exact: true,
    show: getPermissions("admins", "read"),
  },

  Requests: {
    path: "Requests",
    component: lazy(() => import("@iso/containers/Requests")),
    exact: true,
    show: getPermissions("users", "read"),
  },

  // RequestsEdit: {
  //   path: "Requests/edit-Requests/:id",
  //   component: lazy(() => import("@iso/containers/Requests/edit")),
  //   exact: true,
  //   show: getPermissions("Requests", "update"),
  // },
  RequestsShow: {
    path: "Requests/:id",
    component: lazy(() => import("@iso/containers/Requests/details")),
    exact: true,
    show: getPermissions("users", "read"),
  },

  ///
};
export { routes };
export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {Object.values(routes).map((route, idx) =>
          route.show ? (
            <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
              <route.component />
            </Route>
          ) : null
        )}
      </Switch>
    </Suspense>
  );
}
