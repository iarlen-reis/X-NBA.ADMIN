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
import Players from "./screens/players";
import NewPlayer from "./screens/players/new-player";
import PlayerDetail from "./screens/players/player-detail";
import PlayerEdit from "./screens/players/player-edit";

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
      { path: "/players", element: <Players /> },
      { path: "/players/new", element: <NewPlayer /> },
      { path: "/players/:id", element: <PlayerDetail /> },
      { path: "/players/:id/edit", element: <PlayerEdit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
