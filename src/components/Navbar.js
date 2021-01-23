import React, { useState } from "react";
import Login from "components/Modals/Login";
import Search from "components/Modals/SearchManga";
import Register from "components/Modals/Register";
import AnswerModal from "components/Modals/Answer";
import { useStore } from "components/api";

const Navbar = (props) => {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  const [modalAnswer, setModalAnswer] = useState(false);
  const isAuth = useStore((state) => state.isAuth);
  const setAuthFalse = useStore((state) => state.setAuthFalse);
  const removeCollection = useStore((state) => state.removeCollection);
  const removeDetails = useStore((state) => state.removeDetails);

  const logout = () => {
    localStorage.removeItem("token");
    removeCollection();
    removeDetails();
    setAuthFalse();
  };

  return (
    <div style={{ borderBottom: "2px solid #E5E5E5" }}>
      <Login modal={modalLogin} setModal={setModalLogin} />
      <Register modal={modalRegister} setModal={setModalRegister} />
      <Search modal={modalAdd} setModal={setModalAdd} />
      <AnswerModal modal={modalAnswer} setModal={setModalAnswer} />
      <nav
        className="h-16 flex justify-between items-center bg-white text-blue-primary relative shadow-sm font-mono container mx-auto 2xl:p-2 px-4"
        role="navigation"
      >
        <div className="h6">MANGA</div>
        <div className="md:block hidden">
          <button
            onClick={() => setModalAnswer(!modalAnswer)}
            className="py-2 px-4 mr-3 rounded-md bg-white text-blue-primary border border-blue-primary hover:bg-blue-primary hover:text-white focus:outline-none"
          >
            Answer
          </button>
          <button
            className="py-2 px-4 mr-3 rounded-md bg-blue-primary border border-blue-primary text-white hover:bg-white hover:text-blue-primary focus:outline-none"
            onClick={
              isAuth
                ? () => setModalAdd(!modalAdd)
                : () => setModalLogin(!modalLogin)
            }
          >
            {isAuth ? "Add Manga" : "Login"}
          </button>
          <button
            onClick={
              isAuth ? () => logout() : () => setModalRegister(!modalRegister)
            }
            className="py-2 px-4 mr-3 rounded-md bg-white text-blue-primary border border-blue-primary hover:bg-blue-primary hover:text-white focus:outline-none"
          >
            {isAuth ? "Logout" : "Register"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
