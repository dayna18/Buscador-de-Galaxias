document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Limpiar el contenedor antes de añadir nuevos resultados
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';

        // Comprobar si hay elementos en la colección
        if (data.collection.items.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
            return;
        }

        data.collection.items.forEach(item => {
            // Desestructurar datos del JSON
            const { title, description, date_created } = item.data[0];
            const imageUrl = item.links && item.links.length > 0 ? item.links[0].href : 'https://via.placeholder.com/150';

            // Crear la tarjeta con la información de la imagen
            const card = document.createElement('div');
            card.className = 'col-md-4';

            card.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text" style="max-height: 100px; overflow-y: auto;">${description || 'No hay descripción disponible.'}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                        <a href="${imageUrl}" target="_blank" class="btn btn-primary">Ver imagen</a>
                    </div>
                </div>
            `;

            // Agregar la tarjeta al contenedor
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '<p>Error al cargar los datos. Intenta de nuevo más tarde.</p>';
    }
});

