// 1. Mostrar los personajes sin filtrar
// 2. Obtenener todos los personajes
// 3. Renderizar los en el DOM
// 4. Cuando se hagan los cambio esto deberia haber llamdo a la API, para poder renderizarlos de nuevo


// Deferinir los elementos de la API
const charactersEl = document.getElementById('characters');
const nameFilterEl = document.getElementById('name-filter');
const statusFilterEl = document.getElementById('status-filter');

// Crear la funcion para llamar a la API

async function getCharacters (name, status){

    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`;
        }
    }


    const response = await fetch(url);
    const data = await response.json(); 

    return data.results
}
// Crear la funcion que renderiza los elementos que van por dentro del DOM

 async function displayCharacters(name, status) {
    
    // Se obtienen los peronajes que fueron filtrados 
    const characters = await getCharacters(name, status)

    charactersEl.innerHTML = '';   

    // Se renderiza todos los personajes
    
    for( let character of characters){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" />
            <h2> ${character.name} </h2>
            <p> Status: ${character.status} </p>
            <p> Especie: ${character.species} </p>
        `;

        charactersEl.appendChild(card);
    }

}

displayCharacters();

nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value );
});

statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value );
});


