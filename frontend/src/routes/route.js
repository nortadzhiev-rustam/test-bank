import React from "react";

import NavBar from "../container/NavBar";
import Login from "../components/Login";
import Register from "../components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../container/Profile";
import Default from "../container/Default";
import Admin from "../container/Admin";
import Settings from "../container/Settings";
import InicialPage from "../container/InicialPage";
import MyLibrary from "../container/MyLibrary";
import { useSelector } from "react-redux";
import TestEditingPage from "../container/TestEditingPage";
import TestWindow from "../container/TestWindow";
import PrintPage from "../container/PrintPage";
import SearchPage from "../container/SearchByTerm";
import TipTapEditor from "../components/TipTapEditor";
const Routess = () => {
  const user = useSelector((state) => state.user.user.user);
  const [showNav, setShowNav] = React.useState(true);
  return (
    <Router>
      {showNav && <NavBar />}
      <Routes>
        <Route exact path='/' element={<InicialPage />} />
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path='/admin'
            element={<Default setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            path='/admin/private'
            element={<MyLibrary setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            path='/admin/search/:name'
            element={<SearchPage setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            exact
            path='/admin/test/:id/:name'
            element={<TestWindow setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            path='/test/editor/:id/edit'
            element={
              <TestEditingPage setShowNav={setShowNav} showNav={showNav} />
            }
          />

          <Route
            path='/print/test/:id'
            element={<PrintPage setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            exact
            path='/profile'
            element={<Profile setShowNav={setShowNav} showNav={showNav} />}
          />
          <Route
            exact
            path='/settings'
            element={
              user && user.role.toLowerCase() !== "system admin" ? (
                <Settings setShowNav={setShowNav} showNav={showNav} />
              ) : (
                <Admin setShowNav={setShowNav} showNav={showNav} />
              )
            }
          />
          {user && user.role.toLowerCase() === "system admin" && (
            <Route exact path='/admin/dashboard' element={<Admin />} />
          )}
        </Route>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route
          exact
          path='/tiptap'
          element={<TipTapEditor setShowNav={setShowNav} showNav={showNav} />}
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

const PageNotFound = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Page not found 404</h1>
    </div>
  );
};

export default Routess;
