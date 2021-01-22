import React, { useEffect } from "react";
import useDebounce from "components/hooks/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const debouncedSearchTerm = useDebounce(props.keyword, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Set isSearching state
      props.setIsSearching(true);
      // Fire off our API call
      props.searchCharacters(props.keyword);
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  const handleChange = (e) => {
    props.setKeyword(e.target.value);
    props.setNotFound(false);
    props.setResults([]);
  };

  return (
    <div className="h-16 w-full  text-blue-primary relative shadow-sm font-mono ">
      <form className="relative">
        <div className="relative bg-janda text-gray-600 focus-within:text-gray-400 border-2 rounded-3xl pl-4 border-blue-dark">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            name="q"
            value={props.keyword}
            onChange={(e) => handleChange(e)}
            className="py-2 w-3/4 text-sm bg-transparent-start  rounded-md pl-5 focus:outline-none focus:border-blue-dark focus:text-gray-900"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </form>
      {props.isSearching && <div className="text-center">Searching ...</div>}
    </div>
  );
};

export default Search;
