






// Función para agregar un nuevo recurso al hacer clic en el rpimer botón del formulario
document.getElementById("formulario").addEventListener("submit", function(event) {
    //Esto evita que la pagina se recargue al enviar el formulario
    event.preventDefault();
    // Obtener los valores de los campos del formulario
    let nombre = document.getElementById("nombre").value;
    let categoria = document.getElementById("categoria").value;
    let prioridad = document.getElementById("prioridad").value;

    // Validar que los campos no estén vacíos
    if (nombre && categoria && prioridad) {
        let recurso = { nombre, categoria, prioridad };

        // Obtener recursos almacenados y agregar el nuevo
        let recursos = JSON.parse(localStorage.getItem("recursos")) || [];
        recursos.push(recurso);
        localStorage.setItem("recursos", JSON.stringify(recursos));

        mostrarRecursos(); // Actualizar la lista en pantalla
        document.getElementById("formulario").reset();
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Función para mostrar los recursos almacenados
function mostrarRecursos() {
    let lista = document.getElementById("recursos-lista");
    //limpia la lista antes de mostrar los recursos
    lista.innerHTML = ""; 
    //obtiene los recursos almacenados
    let recursos = JSON.parse(localStorage.getItem("recursos")) || [];

    recursos.forEach((recurso, index) => {
        let nuevoRecurso = document.createElement("li");
        
        
        // Si el recurso ya está adquirido, se aplica el estilo directamente
        if (recurso.adquirido) {
    nuevoRecurso.style.textDecoration = "line-through";
    nuevoRecurso.style.textDecorationColor = "violet"; // Esto aplica el color a la línea de tachado
    nuevoRecurso.style.color = "white";
}
        
        nuevoRecurso.innerHTML = `Has agregado el recurso ${recurso.nombre}, cuya categoría corresponde a: ${recurso.categoria}, con una prioridad ${recurso.prioridad} 
            ${!recurso.adquirido ? `<button style="background-color:black; color: white;" onclick="marcarAdquirido(${index})">Adquirido</button>` : ""}
            <button style="background-color:black; color: white;" onclick="eliminarRecurso(${index})">Eliminar</button>`;

        lista.appendChild(nuevoRecurso);

    });
}

// funcion para eliminar 
function eliminarRecurso(index) {
    let recursos = JSON.parse(localStorage.getItem("recursos")) || [];
    recursos.splice(index, 1); // Quita el recurso seleccionado
    localStorage.setItem("recursos", JSON.stringify(recursos));
    mostrarRecursos(); // Actualizar la lista en pantalla
}

//Función para marcar un recurso como adquirido
function marcarAdquirido(index) {
    let recursos = JSON.parse(localStorage.getItem("recursos")) || [];
    recursos[index].adquirido = true; 
    localStorage.setItem("recursos", JSON.stringify(recursos));
    mostrarRecursos(); 
    
}

//Metodo para mostrar la fecha actual
document.getElementById("fecha").textContent = new Date().toLocaleDateString();

window.onload = mostrarRecursos;



