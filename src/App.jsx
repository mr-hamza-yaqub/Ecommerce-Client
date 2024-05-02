import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Collections from "./pages/collection/Collections";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./redux/CategorySlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* To Make an Optional Parameter then simply put ? at the Last */}
          <Route path="/category/:categoryId?" element={<Collections />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
