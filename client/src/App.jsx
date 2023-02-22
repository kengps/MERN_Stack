import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyRouter from "./MyRouter";
import BlogComponent from "./components/BlogComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRouter />} />
        <Route path="/create" element={<BlogComponent />} />
        <Route path="/blog/">
          <Route path=":slug" element={<SingleComponent/>}/>
        </Route>
        <Route path="/blog/edit">
          <Route path=":slug" element={<EditComponent/>}/>
        </Route>
        <Route path="/login" element={<LoginComponent/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
