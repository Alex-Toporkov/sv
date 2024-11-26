// src/components/FurnitureCostPrice.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './css/CostPrice.css';

const totalCostsCabinet = 500000 + 150000 + 70000 + 30000 + 5000; // Материалы + Производственные расходы + Транспорт + Склад + Дополнительные расходы
const unitsCabinet = 100; // Количество единиц корпусной мебели
const costPerCabinetUnit = totalCostsCabinet / unitsCabinet; // Себестоимость одной единицы корпусной мебели
const recommendedPriceCabinet = costPerCabinetUnit * 1.5; // Рекомендованная цена для продажи корпусной мебели

const totalCostsSoft = 300000 + 100000 + 50000 + 20000 + 3000; // Материалы + Производственные расходы + Транспорт + Склад + Дополнительные расходы
const unitsSoft = 200; // Количество единиц мягкой мебели
const costPerSoftUnit = totalCostsSoft / unitsSoft; // Себестоимость одной единицы мягкой мебели
const recommendedPriceSoft = costPerSoftUnit * 1.5; // Рекомендованная цена для продажи мягкой мебели

const dataCabinet = [
    { name: 'Материалы (корпусная мебель)', value: 500000 },
    { name: 'Производственные расходы (корпусная мебель)', value: 150000 },
    { name: 'Транспорт (корпусная мебель)', value: 70000 },
    { name: 'Склад (корпусная мебель)', value: 30000 },
    { name: 'Дополнительные расходы (корпусная мебель)', value: 5000 },
];

const dataSoft = [
    { name: 'Материалы (мягкая мебель)', value: 300000 },
    { name: 'Производственные расходы (мягкая мебель)', value: 100000 },
    { name: 'Транспорт (мягкая мебель)', value: 50000 },
    { name: 'Склад (мягкая мебель)', value: 20000 },
    { name: 'Дополнительные расходы (мягкая мебель)', value: 3000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'];

const FurnitureCostPrice = () => {
    return (
        <div className="furniture-cost-price-container">
            <h1>Обоснование себестоимости товара (корпусная мебель)</h1>
            <br /><br />
            <table className="cost-price-table">
                <thead>
                    <tr>
                        <th>Затраты (корпусная мебель)</th>
                        <th>Сумма (руб.)</th>
                        <th>Процент от общей суммы</th>
                    </tr>
                </thead>
                <tbody>
                    {dataCabinet.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.value}</td>
                            <td>{((entry.value / dataCabinet.reduce((total, item) => total + item.value, 0)) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Себестоимость одной единицы корпусной мебели</strong></td>
                        <td>{costPerCabinetUnit.toFixed(2)} руб.</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td><strong>Рекомендованная цена продажи корпусной мебели</strong></td>
                        <td>{recommendedPriceCabinet.toFixed(2)} руб.</td>
                        <td>—</td>
                    </tr>
                </tbody>
            </table>
            <br /><br />
            <h1>Диаграмма распределения затрат (корпусная мебель)</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={400} height={400} className="pie-chart">
                    <Pie
                        data={dataCabinet}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {dataCabinet.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
            <br /><br />
            <h1>Обоснование себестоимости товара (мягкая мебель)</h1>
            <br /><br />
            <table className="cost-price-table">
                <thead>
                    <tr>
                        <th>Затраты (мягкая мебель)</th>
                        <th>Сумма (руб.)</th>
                        <th>Процент от общей суммы</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSoft.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.value}</td>
                            <td>{((entry.value / dataSoft.reduce((total, item) => total + item.value, 0)) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Себестоимость одной единицы мягкой мебели</strong></td>
                        <td>{costPerSoftUnit.toFixed(2)} руб.</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td><strong>Рекомендованная цена продажи мягкой мебели</strong></td>
                        <td>{recommendedPriceSoft.toFixed(2)} руб.</td>
                        <td>—</td>
                    </tr>
                </tbody>
            </table>
            <br /><br />
            <h1>Диаграмма распределения затрат (мягкая мебель)</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart width={400} height={400} className="pie-chart">
                    <Pie
                        data={dataSoft}
                        cx={200}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {dataSoft.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default FurnitureCostPrice;
