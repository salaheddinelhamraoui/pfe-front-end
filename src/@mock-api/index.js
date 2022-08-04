import "./api/auth-api";
import "./api/notifications-api";
import "./api/dashboards/project-api";
import history from "@history";
import mock from "./mock";
import "./api/academy-api";
import "./api/ecommerce-api";
import "./api/calendar-api";

mock.onAny().passThrough();

if (module?.hot?.status() === "apply") {
  const { pathname } = history.location;
  history.push("/loading");
  history.push({ pathname });
}
