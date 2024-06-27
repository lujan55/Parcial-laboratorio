const express = require('express'); 
const bodyParser = require('body-parser'); 
const { MongoClient } = require('mongodb'); 
const path = require('path'); 

const app = express(); 
const port = 3000; 

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 

const url = 'mongodb://localhost:27017'; 
const dbName = 'formulario'; 

async function main() {
    const client = new MongoClient(url); // Creamos una nueva conexión con MongoDB
    try {
        await client.connect(); // Nos conectamos a MongoDB
        console.log("Conectado a la base de datos");
        const db = client.db(dbName); // Seleccionamos la base de datos 'miColeccion'

        // POST para guardar datos de profesores en la base de datos
        app.post('/api/data', async (res, req) => {
            const { Nombre, Apellido, Materia } = req.body; // Sacamos los datos del cuerpo de la petición
            const documento = { 
                Nombre, 
                Apellido, 
                Materia: { 
                    idMateria: Materia.idMateria,
                    Materia: Materia.Materia, 
                    Horas: Materia.Horas,
                    PlanDeEstudio: Materia.PlanDeEstudio
                } 
            };
            await db.collection('miColeccion').insertOne(documento); // Insertamos un documento en 'miColeccion'

            const allData = await db.collection('miColeccion').find({}).toArray(); // Sacamos todos los documentos de 'miColeccion'
            res.json(allData); // Mandamos una respuesta JSON con todos los datos
        });

        // GET para obtener todos los datos de profesores guardados
        app.get('/api/data', async (req, res) => {
            const result = await db.collection('miColeccion').find({}).toArray(); // Sacamos todos los documentos de 'miColeccion'
            res.json(result); // Mandamos una respuesta JSON con todos los datos
        });

        // inciamos el servidor para escuchar en el puerto especificado
        app.listen(port, () => {
            console.log(`El servidor está escuchando en http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err); 
    }
}

main().catch(console.error); 
