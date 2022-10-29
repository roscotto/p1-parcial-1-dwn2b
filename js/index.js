'use strict';

/*
 * APELLIDO, NOMBRE | APELLIDO, NOMBRE
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     Codigo: 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             Duracion: 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             Duracion: 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             Duracion: 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             Duracion: 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             Duracion: 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             Duracion: 720,
//         },
//     ],
// };



//FUNCIONES PARA VALIDACIONES:

/**
 * Recibe un string y valida que el campo no esté vacío, que no sea null, ni undefined y quita espacios vacios del principio y final. 
 * @param {string} cadena  Nombre del Disco, Banda, Nombre canción 
 * @returns  true / false
 */
function validacionesString(cadena) {
    if (cadena != null) {
        cadena = cadena.trim(); //QUITA ESPACIOS
    }
    //return (cadena == "" || cadena == null || cadena == undefined) ? true : false; //otra opcion con operador ternario
    if (cadena == "" || cadena == null || cadena == undefined) {
        alert("Algo salió mal, volvé a ingresar el dato.")
        return true;
    }
    return false;
}

/**
 * Recibe un número y valida que no sea igual a otro ingresado anteriormente, que esté dentro del rango entre 0 y 999, que sea un número y que el campo no esté vacío. 
 * @param {number} codigo ID del disco
 * @returns  true / false
 */
function validarCodigo(codigo) {
    let bandera = false;
    if (ArregloDeDiscos.length > 0) {
        for (let disco of ArregloDeDiscos) {
            if (disco.id == codigo) {
                alert("el N° de ID ingresado ya corresponde a otro disco cargado. Por favor ingrese un número distinto.");
                bandera = true;
            }
        }
    }
    if (codigo <= 0 || codigo > 999 || isNaN(codigo) || codigo == "") {
        alert("id invalido, ingrese otro identificador")
        bandera = true;
    }
    return bandera;
}


/**
 * Recibe un número y valida que esté dentro del rango entre 0 y 7200, y que sea un número.
 * @param {number} duracion  Duración de la canción (en segundos)
 * @returns  true / false
 */
function validacionDuracion(duracion) {
    let flag = false;
    if (duracion < 0 || duracion > 7200 || isNaN(duracion)) {
        alert("La duración ingresada es incorrecta, volvé a intentarlo. Recordá que el valor debe ser ingresado en segundos.");
        flag = true;
    }
    return flag;
}




// Array de discos
let ArregloDeDiscos = [];


// Función Cargar. Se ejecuta al apretar el botón "Cargar nuevo disco" en el HTML 
const Cargar = () => {
    // Cositas:

    let discoNuevo = {};
    do {
        discoNuevo.nombre = prompt("ingrese el nombre del disco");
    } while (validacionesString(discoNuevo.nombre));
    do {
        discoNuevo.banda = prompt("ingrese la banda del disco");
    } while (validacionesString(discoNuevo.banda))
    do {
        discoNuevo.id = parseInt(prompt("ingrese el identificador del disco"));
    } while (validarCodigo(discoNuevo.id));
    discoNuevo.pistas = [];



    do {
        let pistasDelDisco = {};
        do {
            pistasDelDisco.nombreCancion = prompt("ingrese el nombre de la cancion");
        } while (validacionesString(pistasDelDisco.nombreCancion));

        do {
            pistasDelDisco.duracion = parseInt(prompt("Ingrese la duración de la canción en segundos"));
        } while (validacionDuracion(pistasDelDisco.duracion));

        discoNuevo.pistas.push(pistasDelDisco);

    } while (confirm("queres agregar más canciones?"));

    ArregloDeDiscos.push(discoNuevo);


};


// Función MOSTRAR. Se ejecuta al apretar el botón "Mostrar discos" en el HTML 
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let contenedor = document.getElementById('info');
    debugger;
    if (ArregloDeDiscos.length == 0){
        contenedor.innerHTML = `<span class="red" style="font-size:2rem">AÚN NO HAY ELEMENTOS AGREGADOS A LA LISTA</span>`;
    }else{
        contenedor.innerHTML = "";
        for (let discoNuevo of ArregloDeDiscos) {
            
        

            let html = '<div class="contenedor-individual">';
            html += `       <div class="contenedor-titulo-imagen">                               
                                <div>                                                            
                                    <h3>Disco</h3>                                               
                                    <p>${discoNuevo.nombre}</p>                                  
                                </div>                                                           
                                <div>                                                            
                                    <img src="./img/disco.jpg" alt="imagen de un cd">             
                                </div>                                                           
                            </div>                                                               
                                                                                                
                            <div class="contenedor-2">                                           
                                <div class="contenedor-artista-id">                              
                                    <h3>Banda</h3>                                               
                                    <p>${discoNuevo.banda}</p>                                   
                                                                                                
                                    <div class="contenedor-id">                                   
                                        <p>ID: ${discoNuevo.id}</p>                              
                                    </div>                                                       
                                </div>
                                <div class="contenedor-pistas">                                 
                                    <ol>`                                     
            let pistas = discoNuevo.pistas;
            for (let pistasDelDisco of pistas) {
                let color = "";
                if (pistasDelDisco.duracion > 180) { //Colorea de rojo valores superiores a 180 
                    color = "red";
                }

            html +=            `
                                        <li><p>${pistasDelDisco.nombreCancion}</p>
                                            <p class="${color}" > Duración: ${pistasDelDisco.duracion} seg. </p>
                                            </li>                                           
                                    `
                    
            }

            html += `\n </ol>                                                       
                    </div>                                                          
                    </div>                                                              
                </div>
            </div>`;
            contenedor.innerHTML += html;
        }
    }    
};
