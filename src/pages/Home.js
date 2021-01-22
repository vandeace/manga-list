import NavBar from "components/Navbar";
import { useEffect, useState } from "react";
import { API } from "config/api";
import UpdateModal from "components/Modals/Update";
import Loader from "components/Loader/Loader";

function App() {
  const [list, setList] = useState([]);
  const [change, setChange] = useState(false);
  const [auth, setAuth] = useState(false);
  const [details, setDetails] = useState("");
  const [modalUpdate, setModalUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState("");

  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (!auth) {
      const token = localStorage.getItem("token");

      if (token) {
        setAuth(true);
        setToken(token);
      } else {
        setList([]);
        setDetails("");
      }
    } else {
      fetchData();
    }

    if (change) {
      fetchData();
      setChange(!change);
    }
    // eslint-disable-next-line
  }, [change, auth, details]);

  const fetchData = async () => {
    setLoader(true);
    console.log("fetching...");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.get(`mangas`, {
      headers: headers,
    });
    setLoader(false);
    setList(res.data.data);
    console.log("done fetching...");
  };

  const deleteData = async (id) => {
    setLoader(true);
    // eslint-disable-next-line
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.delete(`mangas/${id}`, {
      headers: headers,
    });
    if (res) {
      setDetails("");
      setChange(true);
    }
    setLoader(false);
  };

  const getDetails = async (id) => {
    console.log("getDetails....");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.get(`/mangas/${id}`, {
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
      setDetails(res.data.data);
    }
  };

  const updateData = (item) => {
    setDetails("");
    setUpdateItem(item);
    setModalUpdate(!modalUpdate);
  };

  return (
    <div className="">
      <NavBar
        change={change}
        setChange={setChange}
        auth={auth}
        setAuth={setAuth}
        fetchData={fetchData}
      />
      <UpdateModal
        setAuth={setAuth}
        modal={modalUpdate}
        setChange={setChange}
        setModal={setModalUpdate}
        item={updateItem}
        change={change}
        fetchData={fetchData}
        getDetails={getDetails}
      />

      {loader && <Loader />}
      <div className="bg-janda pt-5" style={{ height: "90vh" }}>
        <div className="container mx-auto ">
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col h-full w-full ">
              <div
                className="bg-white shadow-lg text-blue-primary relative rounded-3xl font-mono   2xl:p-2 p-4 "
                style={{ height: 700 }}
              >
                <h1 className="text-3xl my-3 text-center font-bold">
                  Manga List
                </h1>
                <div
                  className="pb-5 relative"
                  style={{ height: 570, overflowY: "auto" }}
                >
                  {!auth && (
                    <h1 className="text-center w-full">
                      Login or Register to add your favorite manga to the list
                    </h1>
                  )}
                  {list?.map((item, key) => (
                    <div
                      key={key}
                      onClick={() => getDetails(item.id)}
                      className="border border-gray-light p-4 rounded-xl flex flex-row justify-between my-2 hover:shadow-xl hover:bg-gray-input "
                    >
                      <p className="text-lg flex justify-items-center items-center w-2/3 cursor-pointer">
                        {item.title}
                      </p>
                      <div className=" flex md:flex-row flex-col justify-between items-center w-1/3">
                        <button
                          onClick={() => updateData(item)}
                          className="py-2 px-4 rounded-md bg-teal  text-white focus:outline-none cursor-pointer"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteData(item.id)}
                          className="py-2 px-4 rounded-md bg-red text-white focus:outline-none cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className=" bg-white shadow-lg rounded-3xl font-mono text-blue-primary px-10 py-5"
              style={{ minHeight: 700 }}
            >
              <h1 className="text-3xl my-3 text-center font-bold">
                Manga Detail
              </h1>
              {error.error && <p className="text-red"> error.message</p>}
              {details && details?.length !== 0 && (
                <div className="">
                  <div className="flex flex-row my-4 ">
                    <div className="w-1/3 flex justify-between">
                      Anime Title
                      <span>:</span>
                    </div>
                    <div className="w-2/3 pl-4"> {details?.title}</div>
                  </div>
                  <div className="flex flex-row my-4">
                    <div className="w-1/3 flex justify-between">
                      canonicalTitle
                      <span>:</span>
                    </div>
                    <div className="w-2/3 pl-4"> {details?.canonicalTitle}</div>
                  </div>
                  <div className="flex flex-row my-4">
                    <div className="w-1/3 flex justify-between">
                      synopsis
                      <span>:</span>
                    </div>
                    <div className="w-2/3 pl-4"> {details?.synopsis}</div>
                  </div>
                  {details?.averageRating && (
                    <div className="flex flex-row mt-10">
                      <div className="rounded-full h-24 w-24 flex items-center justify-center bg-teal">
                        {details?.averageRating}
                      </div>
                      <div className="pl-4 flex items-center justify-center">
                        averageRating
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
