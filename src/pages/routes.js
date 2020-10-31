
import PostListPage from "./posts/List";
import DashboardPage from "./Dashboard";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/post/index",
    name: "Post",
    icon: "ni ni-books text-info",
    component: PostListPage,
    layout: "/admin"
  }
];
export default routes;
