# Proyecto con APIS 
***
Esta pagina es un proyecto viejo que quedo fuera de Github pages asi que lo volvi a resubir. El mísmo consiste en una plataforma de publicaciones de "puestos de empleos it". Cada empleo es información cargada en una base de datos de mokApi realizada personalmente para este tp. El usuario puede acceder a cada puesto, filtrar su busqueda con los selects del navbar, editar cada card con informacion que se envia a la base de datos o eliminarla y crear una nueva publicación incluso. El usuario puede elegir si ver el diseño en modo claro o modo oscuro[Podés verlo accediendo a este link!](https://barbaraglopez.github.io/crud-job/index.html)
***
Está diseñado en HTML, CSS, Javascript y Sass con APIS de mockAPI
***
## Primer renderizado:
Este proyecto cuenta con una interaccion dinamica y real con la base de datos. Todos los datos que se editan, se eliminan y se suben, se envian a la API base con la cúal mostramos la información. En el primer renderizado vemos un spinner que nos indica que la pagina esta cargando, luego se visualizan en pantalla las cards con su respectiva información, asi se ve el primer renderizado en modo oscuro y modo claro:
[visualizacion de las cards en blanco](img/renderBlanco.png)
[visualizacion de las cards en oscuro](img/primerRenderDark.png)
***
## por cada card:
Por cada card se puede acceder a los detalles de la misma y editar la información de cada una
[visualizacion de detalles de la card en oscuro](img/cardOscuro.png)
[visualizacion de detalles de la card en blanco](img/cardBlanco.png)
***
## Editar card:
Si el usuario clickea el botón de editar Job se va a visualizar un formulario para que edite la info y la envie
[visualizacion del formulario para editar una card en blanco](img/editarClaro.png)
[visualizacion del formulario para editar una card en oscuro](img/cardOscuro.png)
***
## Crear un post:
Se puede acceder a la opcion para crear un post de empleo y la informacion se va a visualizar en pantalla ademas de figurar en la base de datos
[visualizacion del formulario para crear un post de empleo claro](img/formCrearOscuro.png)
[visualizacion del formulario para crear un post de empleo oscuro](img/formCrearClaro.png)
***
## Filtro de busqueda:
Con los select se puede buscar post con las coincidencias por pais, categoria y seniority. Cuando las busquedas coinciden se muestran los resultados, cuando no ocurre, se muestra un mensaje que indica que no hay coincidencias, Hayy un boton para limpiar los select y volver a buscar
[visualizacion del aviso de busqueda sin coincidencias](img/busqueda.png)
[visualizacion de coincidencias claro](img/coincidenciasClaro.png)
[visualizacion de coincidencias oscuro](img/coincidenciasOscuro.png)
***
Todo el proyecto cuenta con un diseño responsive para mejorar la experiencia del usuario.
