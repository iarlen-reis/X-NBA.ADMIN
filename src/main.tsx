import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Layout from "./screens/layout";
import React from "react";
import App from "./App";
import "./index.css";
import Teams from "./screens/teams";
import NewTeam from "./screens/new-team";
import TeamDetail from "./screens/team-detail";
import TeamEdit from "./screens/team-edit";

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
