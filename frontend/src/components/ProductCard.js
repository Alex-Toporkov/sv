import React, { useState } from 'react';

const ProductCard = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="product-card" onClick={toggleDetails}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Цена: {product.price}₽</p>
            {isOpen && <p>{product.description}</p>}
        </div>
    );
};

export default ProductCard;
