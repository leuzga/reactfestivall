
# Metodología Basica para el uso de GitHub

1. ### Clonar el repositorio

  Ir al enlace [repositorio proyecto integrador](https://github.com/leuzga/pi-c1-g5)

  clonar el repositorio en su maquina local...

  pulse sobre el boton code y seleccione el link que aparece en la pestaña local, opcion HTTPS

  como se muestra en la figura:

  ![Clonar el repositorio remoto](https://s3.amazonaws.com/edu.leuzga.pi-c1-c5/assets/clone.png)

  en una carpeta o folder (donde ustedes vayan a trabajar) ejemplo XYZ  usar el comando:

```bash
    git clone https://github.com/leuzga/pi-c1-g5.git
```

este comando descarga una copia de la rama principal del repositorio remoto a la maquina local.

2. ### Crear una rama nueva

 Las nuevas ramas seran el espacio de trabajo de cada historia asignada a cada uno de los usuarios, por convencion llevaran el nombre de la historia asociando al final el nickname de cada uno de nosotros, por ejemplo:

```bash
    git checkout -b feature/nombre-de-la-historia-leuzga

```

el comando creara una copia de su rama main en la maquina local, es en la que se deben hacer todos los cambios necesarios para cumplir con la actividad de la historia.

3. ### Modificar código en su rama local

  Al iniciar "todos los dias" la activida de modificacion, justo antes de modificar cualquier archivo verifique actualizar  la rama siempre. use los siguientes comando:

```bash
    git pull
```

una vez realizadas las modificaciones usuales de trabajo, agregue las modificaciones al stage (area de trabajo intermedio)

use el siguiente comando

```bash
git add .

```

recuerde el punto se utiliza para indicar "todos los archivos modificados, incluyendo los que se borran.

luego use:

```bash
git commit -m"Mensaje acorde a la actividad realizada"

```

y por ultimo agregue los cambios locales al repositorio remoto

si es la primera vez use:

```bash
git push -u origin nombre de la rama actual

```

en nuestro ejemplo es:

```bash
git push -u origin feature/nombre-de-la-historia-leuzga

```

si NO es la primera vez,"es porque ya el git le esta haciendo seguimiento a la rama por lo que no es necesario el parametro -u"

y el comando queda:

```bash
 git push origin feature/nombre-de-la-historia-leuzga

```

este ciclo se dara cada vez que se realicen modificaciones en los archivos locales

y se quieran actualizar esos cambios al repositorio remoto.
