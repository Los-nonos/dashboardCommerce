# lacade-front
Frontend para Rooftop Academy

# Instrucciones de instalación
Este documento describe los pasos necesarios para configurar el entorno de desarrollo en la PC local bajo sistemas operativos Linux.

### Pre instalación del Proyecto.

* Tener instalado Git.
* Tener una cuenta de GitHub activa.
* Tener instalado Yarn en el equipo.

### Acceder a nuestra cuenta de GitHub y configurar SSH
Al utilizar SSH realizar los siguientes pasos de configuración: ``https://help.github.com/articles/connecting-to-github-with-ssh/``


### Clonar Repositorio de GitHub.
``git clone git@github.com:rooftopdev/lacade-front.git``



### Crear el archivo Envoirment
1. Abrir un terminal en el directorio raíz del proyecto y ejecutar el siguiente comando
2.  ``cp .env.example .env``

### Una vez que ya tenemos clonado nuestro repositorio y creado nuestro archivo Envoiroment, debemos instalar nuestras dependencias.
1. Ingresar al directorio raíz del proyecto
2. Abrir un terminal y ejecutar el comando ``yarn install``

###  Últimos pasos
1. Ingresar al directorio raíz del proyecto
2. Abrir un terminal y ejecutar el comando ``yarn start`` lo que hará que se inicie el servidor en el puerto ``:3003``
3. Si la aplicación compila sin errores, abrir el navegador web de preferencia e ingresar a ``localhost:3003``
4. Para apagar el servidor solo apretar ``ctrl + c`` en la terminal donde levantamos el servidor. 
