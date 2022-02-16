const permissions = JSON.parse(localStorage.getItem("profile")).permissions;
export const getPermissions = (route, type) =>
  permissions?.[route]?.[type] ? true : false;

export const getRole = JSON.parse(localStorage.getItem("profile")).role;
