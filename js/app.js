//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color')
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//eventos

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los autos al cargar

    //llena las opciones de años
    llenarSelect();
});

//event lisener para los select de busqueda
marca.addEventListener('change', (event) => {
    datosBusqueda.marca = event.target.value;
    filtrarAuto();
});

year.addEventListener('change', (event) => {
    datosBusqueda.year = event.target.value;
    filtrarAuto()
    // console.log('csmbio...')
});

minimo.addEventListener('change', (event) => {
    datosBusqueda.minimo = event.target.value;
    // console.log('csmbio...')
    filtrarAuto()
});

maximo.addEventListener('change', (event) => {
    datosBusqueda.maximo = event.target.value;
    // console.log('csmbio...')
    filtrarAuto()
});

puertas.addEventListener('change', (event) => {
    datosBusqueda.puertas = event.target.value;
    // console.log('csmbio...')
    filtrarAuto()
});

transmision.addEventListener('change', (event) => {
    datosBusqueda.transmision = event.target.value;
    // console.log('csmbio...')
    filtrarAuto()
});

color.addEventListener('change', (event) => {
    datosBusqueda.color = event.target.value;
    console.log('csmbio...')
    filtrarAuto()
});




//Funciones
function mostrarAutos(autos) {

    limpiarHTML(); //ELIMINA EL HTML previo

    autos.forEach( auto  => {

        const {marca, modelo, year, precio, puertas, color, transmision, images, images1} = auto;
        const autoHTML = document.createElement('div');
        autoHTML.classList.add('cars')
        const autoImg = document.createElement('img');

        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision} 
        `;

        const contAutoImg = document.createElement('div')
        contAutoImg.classList.add('contAutoImg')
        images1.forEach(imageUrl => {
            const autoImg = document.createElement('img');
            autoImg.setAttribute('src', imageUrl);
            autoHTML.appendChild(contAutoImg);
            contAutoImg.appendChild(autoImg)
        });

        //insertar en el HTML
        resultado.appendChild(autoHTML);

    });
};

//limpiar html
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect() {
    for(let i = max; i >= min; i--) {
        const option = document.createElement('option'); 
        option.value = i;
        option.textContent=i;
        year.appendChild(option);
    }
};

//funcion que filtra en base a la busqueda

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length) {
        mostrarAutos(resultado);
    }else {
        noResultado();
    }
};

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta');
    noResultado.textContent='NO HAY RESULTADO';
    resultado.appendChild(noResultado);
};

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca
    }
    return auto;
};

function filtrarYear (auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === +year
    }
    return auto;
};

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo; 
    }
    return auto;
};

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
};

function filtrarPuertas (auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === +puertas;
    }
    return auto;
};

function filtrarTransmision (auto) {
    const { transmision } = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision
    }
    return auto;
}

function filtrarColor (auto) {
    const { color } = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}

// function filtrarMaximo(auto) {
//     const { maximo } = datosBusqueda;
//     if(maximo){
//         return auto.price <= maximo;
//     }
//     return auto;
// }

