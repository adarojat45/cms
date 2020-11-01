import {
  Dashboard,
  CategoryList,
  CategoryCreate,
  CategoryDetail,
  PostList,
  PostCreate,
  PostDetail,
  UserList,
  UserCreate,
  UserDetail,
} from "./index";

export const routers = [
  {
    component: Dashboard,
    exact: true,
    layout: "/admin",
    path: "/dashboard",
  },
  {
    component: CategoryList,
    exact: true,
    layout: "/admin",
    path: "/category",
  },
  {
    component: CategoryCreate,
    exact: true,
    layout: "/admin",
    path: "/category/create",
  },
  {
    component: CategoryDetail,
    exact: true,
    layout: "/admin",
    path: "/category/detail/:categoryId",
  },
  {
    component: PostList,
    exact: true,
    layout: "/admin",
    path: "/post",
  },
  {
    component: PostCreate,
    exact: true,
    layout: "/admin",
    path: "/post/create",
  },
  {
    component: PostDetail,
    layout: "/admin",
    path: "/post/detail/:postId",
  },
  {
    component: UserList,
    exact: true,
    layout: "/admin",
    path: "/user",
  },
  {
    component: UserCreate,
    layout: "/admin",
    path: "/user/create",
  },
  {
    component: UserDetail,
    layout: "/admin",
    path: "/user/detail/:userId",
  },
];

export const sidebarMenu = [
  {
    component: Dashboard,
    layout: "/admin",
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
  },
  {
    component: CategoryList,
    layout: "/admin",
    path: "/category",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
  },
  {
    component: PostList,
    layout: "/admin",
    path: "/post",
    name: "Post",
    icon: "ni ni-tv-2 text-primary",
  },
];
