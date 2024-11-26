import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams(); // Параметр id используется для получения продукта
    const [product, setProduct] = useState(null);
    const [cartProduct, setCartProduct] = useState(null); // Добавляем состояние для cartProduct
    const [loading, setLoading] = useState(true);
    const [costVisible, setCostVisible] = useState(false); // Статус видимости себестоимости

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                // Получаем детали продукта
                const productResponse = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
                const productData = await productResponse.json();

                // Получаем cartProduct по product id
                const cartResponse = await fetch(`http://127.0.0.1:8000/api/cart-products/product/${id}/`);
                const cartData = await cartResponse.json();

                setProduct(productData);
                setCartProduct(cartData.length > 0 ? cartData[0] : null); // Предполагаем, что получаем массив, берем первый элемент
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!product) {
        return <div>Продукт не найден.</div>;
    }

    return (
        <div className="product-detail-container">
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>Цена: {product.price} ₽</p>
            <div>
                <h3>Описание:</h3>
                <p
                    className="description-text"
                    onMouseEnter={(e) => (e.target.style.color = 'blue')}
                    onMouseLeave={(e) => (e.target.style.color = 'black')}
                >
                    {cartProduct ? cartProduct.description : 'Описание недоступно.'}
                </p>
            </div>
            <div>
                <h3 onClick={() => setCostVisible(!costVisible)} style={{ cursor: 'pointer', color: 'green' }}>
                    Подробнее:
                </h3>
                {costVisible && <p>{cartProduct ? cartProduct.cost : 'Подробности недоступны.'}</p>}
            </div>
        </div>
    );
};

export default ProductDetail;
