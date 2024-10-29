1. Se ordeno un poco el forntend, para disminuir almacenamiento, ademas de crear la carpeta "assets" en nonde se almacena los iconos, imagenes, y fonts que se usan en el programa.

2. Se creo de manera temporal una pagina demaciado simple que servira como coneccion entre ambas paginas.

3. Se transformo los archivos ModuleJS a CommonJS debido a la facilidad y entrega una mejor adaptabilidad con electron

4. CrearPersonal:
- Los datos recibidos en fornt-end, se almacenara en un .json (de manera temporal) en la carpeta del usuario actual.
- El programa detecta si ya se ha ingresado anteriormente un rut, dando un error en pantalla si se intenta ingresar nuevamente.

5. AsignarPersonal:
- Se deshabilito los elementos que no tienen presentacion en front-end (temporal).
- Los archivos que se generaron en "CrearPersonal" se cargaran en esta pagina para efectualizar la "DataBase" desarrollada por Julio Rodriguez.

6. Profesional.cjs: 
- Se rediseño el ingreso de datos de la clase, requiriendo el nombre de la variable y su dato, parecido a la estructura de datos de un .json.
- Se agrego una variable boolean en el constructor para "informar" al constructor de que cargue los datos de un rut en especifico.
- En los metodos "cargar( )" y "guardar( )" se requiere de una variable extra llamada "dir", el cual es la direccion en donde se ubica/ra el archivo a cargar o guardar.