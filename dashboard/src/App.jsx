import Navbar from "./components/Navbar";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductLists from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import NotFound from "./pages/Page404";
import EditProduct from "./pages/EditProduct";
import User from "./pages/User";
import Admin from "./pages/UserEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductLists />} />
        <Route path="edit/:id" element={<EditProduct />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/user" element={<User/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
