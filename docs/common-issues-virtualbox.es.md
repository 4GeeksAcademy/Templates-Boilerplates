## Error en la instalación de VirtualBox en Windows

> Se necesita Microsoft Visual C++ Redistributable Package

![VirtualBox C++ error](https://github.com/4GeeksAcademy/Templates-Boilerplates/raw/master/static/img/vbox-cpp-error.png)

Hay 2 pasos para solventar este error:

1. Instalar [Microsoft Visual C++ Redistributable Package](https://learn.microsoft.com/es-es/cpp/windows/latest-supported-vc-redist?view=msvc-170)

2. Ejecutar el instalador como Administrador: Has click con el boton derecho del mouse en el instalador y seleccion la opcion "Ejecutar como administrador"

## Problema con la clave de producto en la instalación desatendida de Windows

![Windows product key error](https://github.com/4GeeksAcademy/Templates-Boilerplates/raw/master/static/img/win-product-key-error.png)

Este error aparece cuando no se especifíca una clave de producto durante el proceso de configuración de la instalación desatendida. Para corregir esto lo recomendable es volver a configurar la máquina virtual y colocar la siguiente clave en el campo de "Product Key"

> VK7JG-NPHTM-C97JM-9MPGT-3V66T

Esta clave solo es valida para el proceso de instalación, pero no para activar Windows.

![Windows desatendido](https://github.com/4GeeksAcademy/Templates-Boilerplates/raw/master/static/img/createvm2.png)



## Error despues de la instalación "Fallo al adquirir objeto VirtualBox COM"

Este error puede ocurrir por algún error en el proceso posterior a la instalación de VirtualBox, lo que impide que el programa inicie por primera vez.

![VirtualBox C++ error](https://github.com/4GeeksAcademy/Templates-Boilerplates/raw/master/static/img/vbox-com-error.png)

Ocurre debido a la ocurrencia de un error en los archivos de configuración de VirtualBox. Para solucionarlo debemos forzar que el programa vuelva a generar estos archivos, para ello debes ir a la carpeta personal del usuario `C:\Users\{NombreDeUsuario}` y ahi ubicar la carpeta `.VirtualBox`. Basta con cambiarle el nombre a esta carpeta (puede ser .VirtualBox_old) y arrancar el programa de nuevo para que se generen los archivos de configuracion nuevamente. 

Si por alguna razón tenias alguna máquina virtual ya creada y no aparece en el programa, no te preocupes. Las unidades virtuales están en la carpeta que renombraste, solo debes agregar las máquinas nuevamente y especificar el disco duro virtual de tu antigua máquina y la tendrás disponible nuevamente.