const http = require('http');
const mysql = require('mysql2');

const NODE_MSG = process.env.NODE_MSG; 

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    const connection = mysql.createConnection({
        host: 'mysql',
        user: 'root',
        password: 'root1',
        database: 'prueba'
    });

    connection.connect((err) => {
        if (err) {
            res.end('Error en la conexiÃ³n a la base de datos');
        }

        const sql = 'SELECT id, apellidos, nombres, dni FROM alumnos';
        connection.query(sql, (err, results) => {
            if (err) {
                res.end('Error en la consulta a la base de datos');
            }

            let html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Consulta de Alumnos</title>
                    <style>
                        table {
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                    </style>
                </head>
                <body>
                <h2>Consulta de Alumnos</h2>
                <h2>Soy la: ${NODE_MSG}</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>DNI</th>
                    </tr>
            `;

            results.forEach(row => {
                html += `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.apellidos}</td>
                        <td>${row.nombres}</td>
                        <td>${row.dni}</td>
                    </tr>
                `;
            });

            html += `
                </table>
                </body>
                </html>
            `;

            res.end(html);

            connection.end();
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});