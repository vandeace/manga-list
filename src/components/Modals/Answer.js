import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
    background: "rgba(0, 0, 0, 0.1)",
  },
};

const Answer = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState([]);

  const onSubmit = async (data) => {
    const word = data.keyword;
    const wordLength = word.split(" ").length;
    const arrayWordShift = word.split(" ");
    const arrayWordPop = word.split(" ");
    const arrayPopSlice = word.split(" ");
    let splitResult = [];
    let popResult = [];
    let popAndShift = [];
    // console.log(wordLength, "wordLength");
    // console.log(arrayWordPop, "arrayWord");
    //remove with pop
    for (var i = 0; i < wordLength; i++) {
      arrayWordPop.pop();
      splitResult.push(arrayWordPop.join(" "));
    }
    //remove with slice
    for (var j = 0; j < wordLength; j++) {
      arrayWordShift.shift();
      popResult.push(arrayWordShift.join(" "));
    }
    for (var k = 0; k < wordLength; k++) {
      arrayPopSlice.shift();
      arrayPopSlice.pop();
      popAndShift.push(arrayPopSlice.join(" "));
    }
    // console.log(splitResult, "splitResult");
    // console.log(popResult, "popResult");

    const joinedArray = [
      word,
      ...word.split(" "),
      ...splitResult,
      ...popResult,
      ...popAndShift,
    ];
    const filtered = joinedArray.filter(function (el) {
      return el !== "";
    });
    // console.log(filtered, "filtered");
    const finalArray = [...new Set(filtered)];
    // console.log(finalArray, "finalArray");
    finalArray.sort(function (a, b) {
      // ASC  -> a.length - b.length
      // DESC -> b.length - a.length
      return b.length - a.length;
    });
    setResult(finalArray);
  };

  const toggle = () => {
    props.setModal(!props.setModal);
    setResult([]);
  };
  console.log(result, "result");
  return (
    <div>
      <Modal
        isOpen={props.modal}
        style={customStyles}
        contentLabel="Modal Login"
        ariaHideApp={false}
      >
        <div className="" style={{ minWidth: 400 }}>
          <div className="block">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggle}
              className="cursor-pointer"
            />
          </div>
          <h2 className="text-4xl font-mono font-extrabold text-blue-primary text-center my-3">
            KEYWORD SEARCHING
          </h2>
          <h2 className="text-2xl font-mono font-extrabold text-blue-primary text-center my-3">
            Answer Release 0
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Insert Keyword"
                name="keyword"
                className="w-full border-gray-light border my-2 p-2 pl-4 rounded-3xl focus:outline-none shadow appearance-none "
                ref={register({ required: true })}
              />
              <input
                type="submit"
                className="w-full my-2 p-2 rounded-3xl bg-light-blue hover: hover:bg-blue-primary cursor-pointer focus:outline-none shadow appearance-none "
              />
            </div>
          </form>

          <div className="">
            {result.length !== 0 &&
              result.map((item, index) => (
                <div className="flex flex-row my-4 " key={index}>
                  <div className="w-1/12 flex justify-between">
                    {index + 1}
                    <span>:</span>
                  </div>
                  <div className=" pl-4"> {item}</div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Answer;
