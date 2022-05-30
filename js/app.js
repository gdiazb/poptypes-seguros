

// Constructores
function Seguro(brand, year, type) {
     this.brand = brand;
     this.year = year;
     this.type = type;
}

// Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function () {
     let cantidad;
     const base = 2000
     switch(this.brand) {
          case '1':
               cantidad = base * 1.15
               break;
          case '2':
               cantidad = base * 1.05
               break;
          case '3':
               cantidad = base * 1.35
               break;
          default:
               break;
     }

     // leer el año
     const diferencia = new Date().getFullYear() - this.year
     cantidad = cantidad - ((diferencia * 3) * cantidad) / 100

     if(this.type === 'basico') {
          cantidad = cantidad * 1.30
     } else {
          cantidad = cantidad * 1.50
     }

     return cantidad;
}

// Interfaz de usuario
function UI() {
     
}
// Llena la lista del select año
UI.prototype.llenarOpciones = () => {
     const max = new Date().getFullYear();
     const min = max - 20;

     const selectYear = document.querySelector('#year')

     for (let i = max; i > min; i--) {
          let option = document.createElement('option')
          option.value = i;
          option.textContent = i;
          selectYear.appendChild(option)
     }
}

UI.prototype.mostrarMensaje = (mensaje, type) => {
     const alert = document.createElement('div');
     const formuario = document.querySelector('#cotizar-seguro')

     if(type==='error') {
          alert.classList.add('error');
     } else {
          alert.classList.add('correcto');
     }

     alert.classList.add('mensaje', 'mt-10')
     alert.textContent = mensaje
     formuario.insertBefore(alert, document.querySelector('#resultado'))

     setTimeout(() => {
          alert.remove()
     }, 2000)
}

UI.prototype.mostrarResultado = (seguro, total) => {

     const { brand, year, type } = seguro
     let textoMarca;
     switch(brand) {
          case '1':
               textoMarca = 'Americano';
               break;
          case '2':
               textoMarca = 'Asiatico';
               break;
          case '3':
               textoMarca = 'Europeo';
               break;
     }

     const div = document.createElement('div')
     div.classList.add('mt-10')
     div.innerHTML = `
          <p class="header">Tu resumen</p>
          <p><strong>Marca:</strong> ${textoMarca}</p>
          <p><strong>Año:</strong> ${year}</p>
          <p><strong>Tipo:</strong> ${type}</p>
          <p><strong>Total:</strong> $${total}</p>
     `

     const resultadoDiv = document.querySelector('#resultado')
     
     //Mostrar el spinner
     const spinner = document.querySelector('#cargando')
     spinner.style.display = 'block'
     
     setTimeout(() => {
          //Se borra el spninner pero se miestra el resultado
          spinner.style.display = 'none'
          resultadoDiv.appendChild(div)
     }, 2000)

}


// Instanciar UI
const ui = new UI()

document.addEventListener('DOMContentLoaded', () => {
     ui.llenarOpciones() // Llena la lista del select con los años
})

// Validación de campos vacios

addEventListeners();
function addEventListeners() {
     const formuario = document.querySelector('#cotizar-seguro')
     formuario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
     e.preventDefault();

     // leer la marca seleccionada
     const brandUI = document.querySelector('#marca').value
     // leer el años seleccionado
     const yearUI = document.querySelector('#year').value
     // leer el tipo de cobertura
     const typeUI = document.querySelector('input[name="tipo"]:checked').value

     if(brandUI === '' || yearUI === '' || typeUI === '') {
          ui.mostrarMensaje('todos los campos son obligatorios', 'error')
          return
     }
     
     ui.mostrarMensaje('Cotizando', 'correcto')
     
     const resultados = document.querySelector('#resultado div')
     if(resultados != null) {
          resultados.remove()
     }

     // Instanciar el seguro
     const seguro = new Seguro(brandUI, yearUI, typeUI)
     const total = seguro.cotizarSeguro()

     ui.mostrarResultado(seguro, total)
     
}