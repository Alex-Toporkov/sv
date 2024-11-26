import React from 'react';
import { Link } from 'react-router-dom';
import './css/Menu.css'; // Импортируем стили

const Menu = () => {
    return (
        <nav className="menu">
            <ul>
                <li className="menu-item">
                    <Link to="/">Главная</Link> {/* Новый пункт меню для главной страницы */}
                </li>
                <li className="menu-item">
                    Наши товары
                    <ul className="submenu">
                        <li className="submenu-item">
                            <Link to="/products/type/1">Корпусная мебель</Link>
                        </li>
                        <li className="submenu-item">
                            <Link to="/products/type/2">Мягкая мебель</Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item">
                    Отчеты
                    <ul className="submenu">
                        <li className="submenu-item">
                            <Link to="/costprice">Калькуляция</Link>
                        </li>
                        <li className="submenu-item">
                            <Link to="/financial-model">Рентабельность</Link>
                        </li>
                    </ul>
                </li>
                <li className="menu-item">
                    Управление
                    <ul className="submenu">
                        <li className="submenu-item">
                            <Link to="http://127.0.0.1:8000/admin">Админка</Link>
                        </li>
                        <li className="submenu-item">
                            <Link to="/unit-tests">Тестирование</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
