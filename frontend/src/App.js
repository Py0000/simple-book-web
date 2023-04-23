import {Routes, Route, BrowserRouter} from "react-router-dom"
import ViewBook from "./commands/ViewBook";
import AddBook from "./commands/AddBook";
import UpdateBook from "./commands/UpdateBook";
import ViewAuthors from "./commands/ViewAuthors";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewBook/>}/>
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/updatebook/:id" element={<UpdateBook/>}/>
          <Route path="/view_authors" element={<ViewAuthors/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
