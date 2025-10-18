import UsersList from "./pages/UsersList";
import UserAdd from "./pages/UserAdd";

export const userRoutes = [
  { path: "/users", element: <UsersList /> },
  { path: "/users/new", element: <UserAdd /> },
];
