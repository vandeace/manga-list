import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "config/api";
import Loader from "components/Loader/Loader";
import { useStore } from "components/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const setAuthTrue = useStore((state) => state.setAuthTrue);
  const fetchCollection = useStore((state) => state.fetchCollection);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  //submit data
  const onSubmit = async (data) => {
    setLoader(!loader);
    const payload = {
      email: data.email,
      password: data.password,
    };
    const res = await API.post("/register", payload).catch(function (error) {
      if (error.response) {
        const errorMessage = error?.response?.data?.message;
        setLoader(false);
        setError({
          error: true,
          message: errorMessage,
        });
      }
    });
    if (res?.status === 200) {
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token, "token");
      fetchCollection(res.data.token);
      setAuthTrue();
      setLoader(false);
      toggle();
    }
  };

  //toggle modal
  const toggle = () => {
    props.setModal(!props.setModal);
  };

  //clear error on input
  const clearError = () => {
    setError({
      error: false,
      message: "",
    });
  };

  return (
    <div>
      <Modal
        isOpen={props.modal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {loader && <Loader />}
        <div className="" style={{ minWidth: 400 }}>
          <div className="block">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggle}
              className="cursor-pointer"
            />
          </div>
          <h2 className="text-4xl font-mono font-extrabold text-blue-primary text-center my-3">
            Register
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={() => clearError()}
                className="w-full pl-4 border-gray-light border my-2 p-2 rounded-3xl focus:outline-none shadow appearance-none "
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={() => clearError()}
                ref={register({ required: true, min: 8 })}
                className="w-full pl-4 border-gray-light border my-2 p-2 rounded-3xl focus:outline-none shadow appearance-none "
              />
              {error.error && (
                <p className="text-red text-center">{error.message}</p>
              )}
              <input
                type="submit"
                className="w-full my-2 p-2 rounded-3xl bg-light-blue hover: hover:bg-blue-primary cursor-pointer focus:outline-none shadow appearance-none "
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
