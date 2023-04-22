import {Routes, Route, BrowserRouter} from "react-router-dom"
import View from "./commands/View";
import Add from "./commands/Add";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View/>}/>
          <Route path="/add" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
