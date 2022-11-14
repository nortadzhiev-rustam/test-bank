import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import axios from "axios";
import { getDepartmentSuccess } from "./store/departmentSlice";
import Routess from "./routes/route";
function App() {
  const [openSearch, setOpenSearch] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchLogin = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/isAuth", {
        withCredentials: true,
      });
      if (res.status === 200) {
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
      <Routess
        openSearch={openSearch}
        setOpenSearch={(e) => setOpenSearch(e)}
      />
    </div>
  );
}

export default App;
