import React, { useEffect, useState } from "react";
import Login from "components/Modals/Login";
import Search from "components/Modals/SearchManga";
import Register from "components/Modals/Register";

const Navbar = (props) => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    props.setAuth(false);
  };

  useEffect(() => {
    if (!props.auth) {
      const token = localStorage.getItem("token");
      if (token) {
        props.setAuth(true);
      } else {
        props.setAuth(false);
      }
    }
    // eslint-disable-next-line
  }, [props.auth]);

  return (
    <div style={{ borderBottom: "2px solid #E5E5E5" }}>
      <Login
        setAuth={props.setAuth}
        modal={modalLogin}
        setModal={setModalLogin}
      />
      <Register
        setAuth={props.setAuth}
        modal={modalRegister}
        setModal={setModalRegister}
      />
      <Search
        modal={modalAdd}
        setModal={setModalAdd}
        change={props.change}
        setChange={props.setChange}
      />
      <nav
        className="h-16 flex justify-between items-center bg-white text-blue-primary relative shadow-sm font-mono container mx-auto 2xl:p-2 px-4"
        role="navigation"
      >
        <div className="h6">MANGA</div>
        <div className="md:block hidden">
          <button
            className="py-2 px-4 mr-3 rounded-md bg-blue-primary border border-blue-primary text-white hover:bg-white hover:text-blue-primary focus:outline-none"
            onClick={
              props.auth
                ? () => setModalAdd(!modalAdd)
                : () => setModalLogin(!modalLogin)
            }
          >
            {props.auth ? "Add Manga" : "Login"}
          </button>
          <button
            onClick={
              props.auth
                ? () => logout()
                : () => setModalRegister(!modalRegister)
            }
            className="py-2 px-4 mr-3 rounded-md bg-white text-blue-primary border border-blue-primary hover:bg-blue-primary hover:text-white focus:outline-none"
          >
            {props.auth ? "Logout" : "Register"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
