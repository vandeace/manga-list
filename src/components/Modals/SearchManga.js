import React, { useEffect, useState } from "react";
import Search from "components/Search";
import Modal from "react-modal";
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

const SearchManga = (props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const addMangaSuccess = useStore((state) => state.addMangaSuccess);
  const addMangaLoading = useStore((state) => state.addMangaLoading);
  const addManga = useStore((state) => state.addManga);
  const fetchCollection = useStore((state) => state.fetchCollection);

  const searchCharacters = async (keyword) => {
    setNotFound(false);
    const res = await API.get(`/manga?search=${keyword}`);

    setIsSearching(false);
    // Set results state
    if (res.data.length !== 0) {
      setResults(res.data);
    } else {
      setNotFound(true);
    }
  };

  const toggle = () => {
    props.setModal(!props.setModal);
  };

  const addData = async (item) => {
    const payload = {
      idKitsu: item.id,
      title: item.title,
      canonicalTitle: item.canonicalTitle,
      averageRating: item.averageRating,
      synopsis: item.synopsis,
    };
    addManga(payload);
  };

  const clearData = () => {
    setResults([]);
    setKeyword("");
  };

  useEffect(() => {
    if (addMangaSuccess) {
      fetchCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addMangaSuccess]);

  return (
    <div>
      <Modal
        isOpen={props.modal}
        style={customStyles}
        contentLabel="Modal Add"
        ariaHideApp={false}
      >
        {addMangaLoading && <Loader />}
        <div className="" style={{ minWidth: 400, width: 600 }}>
          <div className="block">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggle}
              className="cursor-pointer"
            />
          </div>
          <h2 className="text-4xl font-mono font-extrabold text-blue-primary text-center my-3">
            Add Manga
          </h2>
          <Search
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            results={results}
            setResults={setResults}
            searchCharacters={searchCharacters}
            keyword={keyword}
            setKeyword={setKeyword}
            setNotFound={setNotFound}
          />
          {results.length !== 0 && (
            <div className="py-3">
              <button
                onClick={clearData}
                className="py-2 px-4 mr-3 rounded-md bg-red text-white focus:outline-none"
              >
                Clear Data
              </button>
            </div>
          )}
          <div className="" style={{ height: 400, overflowY: "auto" }}>
            {results.length !== 0 &&
              results.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-light p-4 rounded-xl flex flex-row justify-between my-2"
                >
                  <p className="text-lg flex justify-items-center items-center w-3/4">
                    {item.title}
                  </p>
                  <div className="">
                    <button
                      onClick={() => addData(item)}
                      className="py-2 px-4 mr-3 rounded-md bg-teal  text-white focus:outline-none"
                    >
                      Add To List
                    </button>
                  </div>
                </div>
              ))}
            {notFound && (
              <h1 className="text-red text-3xl text-center">Data Not Found</h1>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SearchManga;
