import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/Page404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import Novbar from "./components/Novbar";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <BrowserRouter>
      <Novbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
