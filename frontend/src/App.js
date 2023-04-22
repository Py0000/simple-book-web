import {Routes, Route, BrowserRouter} from "react-router-dom"
import View from "./commands/View";
import Add from "./commands/Add";
import Update from "./commands/Update";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
