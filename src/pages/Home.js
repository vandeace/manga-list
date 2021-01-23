import NavBar from "components/Navbar";
import { useEffect, useState } from "react";
import { API } from "config/api";

import { useStore } from "components/api";
import MangaList from "components/MangaList";
import MangaDetails from "components/MangaDetails";

function App() {
  //zustand states

  const fetchCollection = useStore((state) => state.fetchCollection);
  const isAuth = useStore((state) => state.isAuth);
  const setAuthTrue = useStore((state) => state.setAuthTrue);
  const setAuthFalse = useStore((state) => state.setAuthFalse);

  //zustand states end

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthTrue();
      fetchCollection();
    } else {
      setAuthFalse();
    }
    // eslint-disable-next-line
  }, [isAuth]);

  // const deleteData = async (id) => {
  //   setLoader(true);
  //   // eslint-disable-next-line
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const res = await API.delete(`mangas/${id}`, {
  //     headers: headers,
  //   });
  //   if (res) {
  //     setDetails("");
  //     setChange(true);
  //   }
  //   setLoader(false);
  // };

  return (
    <div className="">
      <NavBar />

      <div className="bg-janda pt-5" style={{ height: "90vh" }}>
        <div className="container mx-auto ">
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col h-full w-full ">
              <div
                className="bg-white shadow-lg text-blue-primary relative rounded-3xl font-mono   2xl:p-2 p-4 "
                style={{ height: 700 }}
              >
                <MangaList />
              </div>
            </div>
            <div
              className=" bg-white shadow-lg rounded-3xl font-mono text-blue-primary px-10 py-5"
              style={{ minHeight: 700 }}
            >
              <MangaDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
