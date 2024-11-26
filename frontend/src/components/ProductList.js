// src/components/ProductList.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './css/ProductList.css'; // Не забудьте импортировать CSS-файл

const ProductList = ({ products }) => {
    const { typeId } = useParams();

    // Фильтруем продукты по типу, если необходимо
    const filteredProducts = typeId
        ? products.filter(product => product.type_product === parseInt(typeId))
        : products;

    return (
        <div>
            <h2>Наша мебель</h2>
            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={product.image} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Цена: {product.price} ₽</p>
                                <p className="card-text">Остаток на складе: {product.rest} шт.</p>
                                <a href={`/products/${product.id}`} className="btn btn-primary">Подробнее</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
