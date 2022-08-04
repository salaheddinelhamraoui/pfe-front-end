/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["admin"],
  freelancer: ["freelancer"],
  company: ["company"],
  all: ["admin", "freelancer", "company"],
  onlyGuest: [],
};

export default authRoles;
