# MISW4103 Semana 5

## Pruebas E2E
Equipo #3
- Laura Alejandra Carrillo Guzmán, l.carrillog@uniandes.edu.co​​
- Sandra Victoria Hurtado Gil, sv.hurtadog@uniandes.edu.co​​
- Leidy Viviana Osorio Jimenez, l.osorioj@uniandes.edu.co​​
- Tim Ulf Pambor, t.pambor@uniandes.edu.co​​

## Funcionalidades bajo pruebas
1. Crear un Post: Permite crear un nuevo post (una entrada o publicación con título y texto) en el sitio web, puede ser para publicar inmediatamente o para publicar después, en una fecha y hora programadas. También es posible crear un post “borrador”, es decir, que todavía no está publicado ni programado, para continuar en otro momento.
2. Listar Post: Permite ver todos los post creados 
3. Crear una Página: Permite crear una nueva página para el sitio web (con nombre, texto y posible contenido multimedia), que tendrá un enlace para su consulta desde la página inicial. 
4. Editar una Página: Permite modificar la información de una página existente, como el título, el texto, los tags, entre otros.
5. Crear tag: Permite crear una nueva etiqueta para clasificar los post o páginas. Las etiquetas, además de su nombre y su alias (“slug”), pueden tener una descripción y una imagen asociada.
6. Editar perfil: Permite modificar la información de un perfil existente, como la foto, correo, entre otros.

## Instrucciones para ejecutar pruebas Cypress
1. Clonar este repositorio
2. Ir a la carpeta Cypress
3. Instalar las dependencias con `npm install`
4. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
5. Si Ghost está ubicado en una dirección differente a http://localhost:2368, hay que cambiar el `baseUrl` en `cypress.config.js`
6. Si aun **no** ha creado un sitio en Ghost
    * se puede crear de forma automatizado, ir a punto 8
    * se puede crear de forma manual en http://127.0.0.1:2368/ghost/#/setup/one, ir a punto 7
7. Si ya ha creado un sitio en Ghost, se puede configurar `username` y `password` en `cypress.config.js` con los datos del usuario para ejecutar las pruebas
8. Iniciar Cypress (ubicado en la carpeta cypress):
    * Para Linux, ejecuta `./node_modules/.bin/cypress open` para iniciar Cypress
    * Para Windows, ejecuta `node_modules\.bin\cypress open` para iniciar Cypress
9. Seleccionar `E2E Testing`
10. Seleccionar `Chrome`/`Chromium` y haz clic en `Start E2E Testing in Chromium`
11. Seleccionar el archivo `create-tag.cy.js` para su ejecución

## Instrucciones para ejecutar pruebas Kraken
1. Ejecutar Ghost 3.41.1 con Docker `docker run --rm -t -p 2368:2368 ghost:3.41.1` (recomendado) o de forma local siguiendo las instrucciones del [tutorial](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/ghost-local-deployment/index.html)
2. Crear, en Ghost, un usuario (puede ser el usuario administrador) y tener un sitio (puede ser el que se crea por defecto).
2. Clonar este repositorio
3. Ir a la carpeta Kraken
4. En caso de no tener instalado Kraken, instalarlo con `npm install kraken-node`
5. Abrir el archivo `properties.json` y actualizar los enlaces, el email y el password correspondientes a la instalación que tiene de Ghost
6. Ejecutar Kraken:
    * si se tiene instalado globalmente se ejecuta: `kraken-node run`  (o `node kraken-node run`)
    * si se instaló solo en la carpeta se ejecuta: `./node_modules/kraken-node/bin/kraken-node run`
   
Ventajas y desventajas 

[Ventajas y desventajas  Cypress y Kraken](Se-presenta-la-comparación-entre-los-frameworks--Cypress-y-Kraken)
