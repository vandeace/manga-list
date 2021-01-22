import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "pages/Home";

// const getKeyWord = async () => {
//   const word = "cat and dog eat";
//   const wordLength = word.split(" ").length;
//   const arrayWordShift = word.split(" ");
//   const arrayWordPop = word.split(" ");
//   const arrayPopSlice = word.split(" ");
//   let splitResult = [];
//   let popResult = [];
//   let popAndShift = [];
//   console.log(wordLength, "wordLength");
//   console.log(arrayWordPop, "arrayWord");
//   //remove with pop
//   for (var i = 0; i < wordLength; i++) {
//     arrayWordPop.pop();
//     splitResult.push(arrayWordPop.join(" "));
//   }
//   //remove with slice
//   for (var j = 0; j < wordLength; j++) {
//     arrayWordShift.shift();
//     popResult.push(arrayWordShift.join(" "));
//   }
//   for (var k = 0; k < wordLength; k++) {
//     arrayPopSlice.shift();
//     arrayPopSlice.pop();
//     popAndShift.push(arrayPopSlice.join(" "));
//   }
//   console.log(splitResult, "splitResult");
//   console.log(popResult, "popResult");

//   const joinedArray = [
//     word,
//     ...word.split(" "),
//     ...splitResult,
//     ...popResult,
//     ...popAndShift,
//   ];
//   const filtered = joinedArray.filter(function (el) {
//     return el !== "";
//   });
//   console.log(filtered, "filtered");
//   const finalArray = [...new Set(filtered)];
//   console.log(finalArray, "finalArray");
// };

function App() {
  return (
    <div className="">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
