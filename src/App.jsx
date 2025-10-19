import React from "react";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import TaskManager from "./pages/taskManager.jsx";
import About from "./pages/about.jsx";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/productList.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
