const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8080;
const BACKEND_URL = ProcessingInstruction.env.BACKEND_URL || 'http://backend:3001';

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Hello World - Frontend</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                button { padding: 10px 15px; margin: 5px; cursor: pointer; }
                pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>Hello World</h1>
            <button onclick="saludar()">Saludar (API)</button>
            <button onclick="cargar()">Generar carga de CPU (30s)</button>
            
            <h3>Respuesta del servidor:</h3>
            <pre id="resultado">Esperando acción...</pre>

            <script>
                async function saludar() {
                    document.getElementById('resultado').innerText = "Cargando...";
                    try {
                        const res = await fetch('/api/hello');
                        const data = await res.json();
                        document.getElementById('resultado').innerText = JSON.stringify(data, null, 2);
                    } catch (e) {
                        document.getElementById('resultado').innerText = "Error: " + e.message;
                    }
                }

                async function cargar() {
                    document.getElementById('resultado').innerText = "Iniciando carga de CPU en el backend...";
                    try {
                        const res = await fetch('/api/load');
                        const data = await res.json();
                        document.getElementById('resultado').innerText = JSON.stringify(data, null, 2);
                    } catch (e) {
                        document.getElementById('resultado').innerText = "Error: " + e.message;
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.get('/api/hello', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/hello`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/load', async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/load?seconds=30`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Frontend iniciado en el puerto ${PORT}`);
});