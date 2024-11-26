// src/components/RunTests.js
import React, { useState } from 'react';

const RunTestsPage = () => {
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRunTests = async () => {
        setLoading(true);
        setOutput(''); // Сброс предыдущего вывода

        try {
            const response = await fetch('http://127.0.0.1:8000/api/run-tests/'); 
            const data = await response.json();

            if (data.returncode === 0) {
                setOutput('Тесты прошли успешно:\n' + data.stdout);
            } else {
                setOutput('Тесты завершились ошибкой:\n' + data.stderr);
            }
        } catch (error) {
            setOutput('Ошибка запуска тестов: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Запуск Юнит-Тестов</h2>
            <button onClick={handleRunTests} disabled={loading}>
                {loading ? 'Запуск...' : 'Запустить тесты'}
            </button>
            <pre>{output}</pre>
        </div>
    );
};

export default RunTestsPage;
