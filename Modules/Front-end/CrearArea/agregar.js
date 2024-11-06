const boton = document.getElementById('boton');
        const texto = document.querySelector('.texto');
        const logo = document.querySelector('.logo');

        boton.addEventListener('click', function() {
            boton.classList.toggle('active');

            if (boton.classList.contains('active')) {
                texto.textContent = 'OK';
                logo.style.opacity = 0; 
            } else {
                texto.textContent = 'Agregar';
                logo.style.opacity = 1; 
            }
        });

        document.getElementById('boton').addEventListener('click', function() {
            // Obtener el valor del input
            const nombre = document.querySelector('.input-box input').value;
        
            // Verificar si el campo no está vacío
            if (nombre.trim() !== "") {
                // Crear un nuevo div con clase 'ab'
                const nuevaCaja = document.createElement('div');
                nuevaCaja.classList.add('ab');
        
                // Agregar el contenido (nombre ingresado)
                nuevaCaja.textContent = nombre;
        
                // Agregar la nueva caja al contenedor container-ab
                document.querySelector('.container-ab').appendChild(nuevaCaja);
        
                // Limpiar el campo de entrada después de agregar el nombre
                document.querySelector('.input-box input').value = "";
        
                // Evitar cajas duplicadas o "extra" al inicio
                resetLayout();
            } else {
                alert("Por favor, ingrese un nombre.");
            }
        });
        
        // Función para evitar reinicios o cajas duplicadas
        function resetLayout() {
            // Aquí puedes implementar alguna lógica que elimine cualquier caja errónea
            // que aparezca al inicio si es necesario, por ejemplo:
            const todasLasCajas = document.querySelectorAll('.ab');
            todasLasCajas.forEach((caja, index) => {
                // Si alguna caja tiene un contenido que no debería estar, puedes eliminarla
                if (caja.textContent === "" || caja.textContent === "default") {
                    caja.remove();
                }
            });
        }
        
        window.onload = function() {
            const contenedor = document.querySelector('.container-ab');
            contenedor.innerHTML = '';  // Limpiar todo el contenido inicial
        };
        