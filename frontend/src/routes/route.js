import React from "react";
import Home from "../container/Home";
import NavBar from "../container/NavBar";
import Login from "../components/Login";
import Register from "../components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SearchWindow from "../components/searchWindow";
import Profile from "../container/Profile";
import Default from "../container/Default";
const Routess = ({ openSearch, setOpenSearch }) => {
  return (
    <Router>
      <NavBar setOpenSearch={(o) => setOpenSearch(o)} />
      {openSearch && (
        <SearchWindow open={openSearch} setOpen={(e) => setOpenSearch(e)} />
      )}
      <Routes>
        <Route exact path='/' element={<Default />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/test/:swt' element={<Home />} />
          <Route path='/test/creator/:id' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
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
