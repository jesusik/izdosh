import React from "react";
import { Route, Routes, HashRouter } from "react-router-dom"; // Importing Route and Routes components
import { APP_ROUTES } from "./Route.js";
import Main from "../components/Main/Main";

function Router() {
  return (
    <HashRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to={APP_ROUTES.WELCOME} />} /> */}
        <Route path={APP_ROUTES.WELCOME} element={<Main />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
