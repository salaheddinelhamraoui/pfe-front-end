/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["admin"],
  freelancer: ["freelancer", "admin"],
  company: ["company", "admin"],
  all: ["admin", "freelancer", "company"],
  onlyGuest: [],
};

export default authRoles;
