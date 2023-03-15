import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyRouter from "./MyRouter";
import BlogComponent from "./components/BlogComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import PrivateRoutes from "./PrivateRoutes";
import LoggedComponent from "./layout/LoggedComponent";
import PageAdmin from "./components/pages/admin/PageAdmin";
import PageUser from "./components/pages/users/PageUser";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyRouter />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/create" element={<BlogComponent />} exact />
          <Route path="/blog/edit">
            <Route path=":slug" element={<EditComponent />} />
          </Route>
        </Route>
        <Route path="/blog/">
          <Route path=":slug" element={<SingleComponent />} />
        </Route>

        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/logged" element={<LoggedComponent />} />
        <Route path="/level/admin" element={<PageAdmin />} />
        <Route path="/level/user" element={<PageUser />} />
      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MyRouter />} />
    //     <Route
    //       path="/create"
    //       element={<AdminRouter element={<BlogComponent />} />}
    //     />
    //     <Route path="/blog/">
    //       <Route path=":slug" element={<SingleComponent />} />
    //     </Route>
    //     <Route path="/blog/edit">
    //       <Route
    //         path=":slug"
    //         element={<AdminRouter element={<EditComponent />} />}
    //       />
    //     </Route>
    //     <Route path="/login" element={<LoginComponent />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
