document.getElementById('dataForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const Nombre = document.forms['profeForm']['Nombre'].value;
    const Apellido = document.forms['profeForm']['Apellido'].value;
    const idMateria = document.forms['profeForm']['idMateria'].value;
    const Materia = document.forms['profeForm']['Materia'].value;
    const Horas = document.forms['profeForm']['Horas'].value;
    const PlanDeEstudio = document.forms['profeForm']['PlanDeEstudio'].value;
    
   
    const data = {
        Nombre,
        Apellido,
        Materia: {
            idMateria,
            Materia,
            Horas,
            PlanDeEstudio
        }
    };

    
    const response = await fetch('/api/data', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
    });

    const result = await response.json(); 
    console.log(result); // Mostramos el resultado que nos dio el servidor en la consola del navegador
});

// Evento click para obtener todos los datos de profesores que están guardados en el servidor
document.getElementById('leerBtn').addEventListener('click', async () => {
    const response = await fetch('/api/data'); // Hacemos la solicitud GET al servidor para obtener datos
    const result = await response.json(); // Esperamos la respuesta del servidor y la convertimos a objeto JavaScript
    console.log(result); // Mostramos el resultado que nos dio el servidor en la consola del navegador

    // Mostramos los datos en el elemento 'result' del HTML
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result.map(item => {
        const materia = item.Materia || {}; // Accedemos a la subestructura 'Materia' del objeto 'item'
        return `
            Nombre: ${item.Nombre}<br> 
            Apellido: ${item.Apellido}<br> 
            idMateria: ${materia.idMateria || 'N/A'}<br> 
            Materia: ${materia.Materia || 'N/A'}<br> 
            Horas: ${materia.Horas || 'N/A'}<br> 
            PlanDeEstudio: ${materia.PlanDeEstudio || 'N/A'}<br> <br>
        `;
    }).join(''); // Unimos todos los elementos del array 'result' en una cadena HTML y la agregamos al elemento 'resultDiv'
});
