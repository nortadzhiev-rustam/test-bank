import React from "react";
import Home from "../container/Home";
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
const Routess = ({ openSearch, setOpenSearch }) => {
  const user = useSelector((state) => state.user.user.user);
  return (
    <Router>
      <NavBar setOpenSearch={(o) => setOpenSearch(o)} />

      <Routes>
        <Route exact path='/' element={<InicialPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<Default />} />
          <Route path='/admin/private' element={<MyLibrary />} />
          <Route key='inicial' path='/test' element={<Home />} />
          <Route exact path='/test/:swt' element={<Home />} />
          <Route exact path='/test/:swt/editor/:id' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route
            exact
            path='/settings'
            element={
              user && user.role.toLowerCase() !== "admin" ? (
                <Settings />
              ) : (
                <Admin />
              )
            }
          />
          {user && user.role.toLowerCase() === "admin" && (
            <Route exact path='/admin/dashboard' element={<Admin />} />
          )}
        </Route>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />

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
