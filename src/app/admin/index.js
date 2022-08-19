import CompaniesAppConfig from './companies/CompaniesAppConfig';
import FreelacerAppConfig from './freelancers/FreelacerAppConfig';
import ProjectsAppConfig from './projects/ProjectsAppConfig';
import ProjectDashboardAppConfig from './project/ProjectDashboardAppConfig';
import ProfileAppConfig from './profile/ProfileAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import CalendarAppConfig from './Calendar/CalendarAppConfig';

const adminRoutes = [
  CompaniesAppConfig,
  FreelacerAppConfig,
  ProjectsAppConfig,
  ProjectDashboardAppConfig,
  ProfileAppConfig,
  FileManagerAppConfig,
  CalendarAppConfig,
];

export default adminRoutes;
