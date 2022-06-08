import React from "react";
import Home from "./container/Home";
import NavBar from "./container/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import SearchWindow from "./components/searchWindow";
import Profile from "./container/Profile";
import axios from "axios";
import { getDepartmentSuccess } from "./store/departmentSlice";
import MathDialog from "./components/MathDialog";
function App() {
  const [openSearch, setOpenSearch] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchLogin = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/isAuth", {
        withCredentials: true,
      });
      if (res.data.user) {
        dispatch(login(res.data.user));
      }
    };
    fetchLogin();
  }, [dispatch]);

  React.useEffect(() => {
    //add event listener that listens for ctrl+k and changes openSearch to true
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "K") {
        setOpenSearch(true);
      }
    });
  }, []);
  React.useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/departments", {
        withCredentials: true,
      });
      dispatch(getDepartmentSuccess(res.data));
    };
    fetchDepartments();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <NavBar setOpenSearch={(o) => setOpenSearch(o)} />
        {openSearch && (
          <SearchWindow open={openSearch} setOpen={(e) => setOpenSearch(e)} />
        )}
        <Routes>
          <Route exact path='/' element={<ProtectedRoute component={Home} />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/math' element={<MathDialog />} />
          <Route
            path='/profile'
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

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

export default App;
