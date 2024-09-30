import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Layout from "./screens/layout";
import React from "react";
import App from "./App";
import "./index.css";

import TeamDetail from "./screens/teams/team-detail";
import TeamEdit from "./screens/teams/team-edit";
import NewTeam from "./screens/teams/new-team";
import Teams from "./screens/teams/teams";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/teams", element: <Teams /> },
      { path: "/teams/new", element: <NewTeam /> },
      { path: "/teams/:id", element: <TeamDetail /> },
      { path: "/teams/:id/edit", element: <TeamEdit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
