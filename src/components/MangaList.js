import React, { useEffect, useState } from "react";
import { useStore } from "components/api";
import UpdateModal from "components/Modals/Update";

const MangaList = () => {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [updateItem, setUpdateItem] = useState("");
  const collection = useStore((state) => state.collection);
  const isAuth = useStore((state) => state.isAuth);
  const loadingCollection = useStore((state) => state.loadingCollection);
  const fetchDetails = useStore((state) => state.fetchDetails);
  const updateDataSuccess = useStore((state) => state.updateDataSuccess);
  const fetchCollection = useStore((state) => state.fetchCollection);
  const deleteDataSuccess = useStore((state) => state.deleteDataSuccess);
  const deleteData = useStore((state) => state.deleteData);
  const fetchError = useStore((state) => state.fetchError);
  const fetchErrorMessage = useStore((state) => state.fetchErrorMessage);

  const updateData = (item) => {
    setUpdateItem(item);
    setModalUpdate(!modalUpdate);
  };

  useEffect(() => {
    if (updateDataSuccess) {
      fetchCollection();
    }
    if (deleteDataSuccess) {
      fetchCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDataSuccess, deleteDataSuccess]);

  return (
    <div>
      <UpdateModal
        modal={modalUpdate}
        setModal={setModalUpdate}
        item={updateItem}
      />
      <h1 className="text-3xl my-3 text-center font-bold">Manga List</h1>
      <div className="pb-5 relative" style={{ height: 570, overflowY: "auto" }}>
        {!isAuth && (
          <h1 className="text-center w-full">
            Login or Register to add your favorite manga to the list
          </h1>
        )}
        {loadingCollection && <p className="">Fetching....</p>}
        {fetchError && <p className="">{fetchErrorMessage}</p>}
        {collection?.map((item, key) => (
          <div
            key={key}
            onClick={() => fetchDetails(item.id)}
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
  );
};

export default MangaList;
