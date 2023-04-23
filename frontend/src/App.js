import {Routes, Route, BrowserRouter} from "react-router-dom"
import ViewBook from "./commands/books/ViewBook";
import AddBook from "./commands/books/AddBook";
import UpdateBook from "./commands/books/UpdateBook";
import ViewAuthors from "./commands/authors/ViewAuthors";
import AddAuthor from "./commands/authors/AddAuthor";
import UpdateAuthor from "./commands/authors/UpdateAuthor";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewBook/>}/>
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/updatebook/:id" element={<UpdateBook/>}/>
          <Route path="/view_authors" element={<ViewAuthors/>}/>
          <Route path="/add_author" element={<AddAuthor/>}/>
          <Route path="/update_author/:id" element={<UpdateAuthor/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
