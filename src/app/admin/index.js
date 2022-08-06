import CompaniesAppConfig from "./companies/CompaniesAppConfig";
import FreelacerAppConfig from "./freelancers/FreelacerAppConfig";
import ProjectsAppConfig from "./projects/ProjectsAppConfig";
import ProjectDashboardAppConfig from "./project/ProjectDashboardAppConfig";
import ProfileAppConfig from "./profile/ProfileAppConfig";

const adminRoutes = [
  CompaniesAppConfig,
  FreelacerAppConfig,
  ProjectsAppConfig,
  ProjectDashboardAppConfig,
  ProfileAppConfig,
];

export default adminRoutes;
