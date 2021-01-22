import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "config/api";
import Loader from "components/Loader/Loader";

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

const Update = (props) => {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const onSubmit = async (data) => {
    setLoader(true);
    const payload = {
      title: data.title,
      canonicalTitle: data.canonicalTitle,
      averageRating: data.averageRating,
      synopsis: data.synopsis,
    };
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.patch(`/mangas/${props.item.id}`, payload, {
      headers: headers,
    }).catch(function (error) {
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
      console.log(res.data.data.id, "id");
      setLoader(false);
      //   props.setChange(props.change);
      props.fetchData();
      props.getDetails(res.data.data.id);
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

  useEffect(() => {
    if (!props.item) {
      toggle();
    }
    // eslint-disable-next-line
  }, [props.item]);

  return (
    <div>
      <Modal
        isOpen={props.modal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        {loader && <Loader />}
        <div className="px-5" style={{ minWidth: 400 }}>
          <div className="block">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggle}
              className="cursor-pointer"
            />
          </div>
          <h2 className="text-4xl font-mono font-extrabold text-blue-primary text-center my-3">
            Update Data
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label
                className="font-mono font-semibold text-xl text-blue-primary"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                placeholder="title"
                name="title"
                onChange={() => clearError()}
                defaultValue={props?.item?.title}
                className="w-full pl-4 border-gray-light border my-2 p-2 rounded-3xl focus:outline-none shadow appearance-none "
                ref={register()}
              />
              <label
                className="font-mono font-semibold text-xl text-blue-primary"
                htmlFor="canonicalTitle"
              >
                Canonical Title
              </label>
              <input
                type="text"
                placeholder="canonicalTitle"
                name="canonicalTitle"
                defaultValue={props?.item?.canonicalTitle}
                onChange={() => clearError()}
                ref={register()}
                className="w-full pl-4 border-gray-light border my-2 p-2 rounded-3xl focus:outline-none shadow appearance-none "
              />
              <label
                className="font-mono font-semibold text-xl text-blue-primary"
                htmlFor="synopsis"
              >
                Synopsis
              </label>
              <textarea
                type="text"
                placeholder="synopsis"
                name="synopsis"
                rows="5"
                defaultValue={props?.item?.synopsis}
                onChange={() => clearError()}
                ref={register()}
                className="w-full pl-4 border-gray-light border my-2 p-2 rounded-3xl focus:outline-none shadow appearance-none "
              />
              <label
                className="font-mono font-semibold text-xl text-blue-primary"
                htmlFor="averageRating"
              >
                Average Rating
              </label>
              <input
                type="number"
                placeholder="averageRating"
                name="averageRating"
                step="0.01"
                defaultValue={parseFloat(props?.item?.averageRating)}
                onChange={() => clearError()}
                ref={register()}
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

export default Update;
