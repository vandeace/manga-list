import React from "react";
import { useStore } from "components/api";

const MangaDetails = () => {
  const details = useStore((state) => state.details);
  const loading = useStore((state) => state.loading);

  return (
    <div>
      <h1 className="text-3xl my-3 text-center font-bold">Manga Detail</h1>
      {loading && <p className="">Fetching....</p>}

      <div className="">
        {details?.title && !loading && (
          <div className="flex flex-row my-4 ">
            <div className="w-1/3 flex justify-between">
              Anime Title
              <span>:</span>
            </div>
            <div className="w-2/3 pl-4"> {details?.title}</div>
          </div>
        )}

        {details?.canonicalTitle && !loading && (
          <div className="flex flex-row my-4">
            <div className="w-1/3 flex justify-between">
              canonicalTitle
              <span>:</span>
            </div>
            <div className="w-2/3 pl-4"> {details?.canonicalTitle}</div>
          </div>
        )}
        {details?.synopsis && !loading && (
          <div className="flex flex-row my-4">
            <div className="w-1/3 flex justify-between">
              synopsis
              <span>:</span>
            </div>
            <div className="w-2/3 pl-4"> {details?.synopsis}</div>
          </div>
        )}

        {details?.averageRating && !loading && (
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
    </div>
  );
};

export default MangaDetails;
