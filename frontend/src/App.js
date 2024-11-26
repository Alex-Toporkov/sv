// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import About from './components/About';
import CostPrice from './components/CostPrice';
import FinancialModel from './components/FinancialModel';
import RunTestsPage from './components/RunTests';
import './App.css';

const App = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    return (
        <Router>
            <Header />
            <div className="app-container">
                <Menu />
                <div className="divider"> </div>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/costprice" element={<CostPrice />} />
                        <Route path="/financial-model" element={<FinancialModel />} />
                        <Route path="/products/type/:typeId" element={<ProductList products={products} />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/unit-tests" element={<RunTestsPage />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
