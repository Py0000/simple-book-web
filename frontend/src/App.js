import {Routes, Route, BrowserRouter} from "react-router-dom"
import ViewBook from "./commands/ViewBook";
import AddBook from "./commands/AddBook";
import UpdateBook from "./commands/UpdateBook";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewBook/>}/>
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/updatebook/:id" element={<UpdateBook/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
