---
title: 'Notebooks: Un Solo Ambiente de Trabajo'
description: 'Aprende qué es un notebook, cómo funciona y cómo manejar importaciones y variables en este entorno interactivo. Descubre errores comunes y cómo evitarlos para trabajar eficientemente en notebooks como Jupyter Notebook y Google Colab.'
technologies: ['python', 'jupyter-notebook', 'google-colab']
---


## ¿Qué es un Notebook y cómo Funciona?
Un **notebook** (como Jupyter Notebook o Google Colab) es un entorno interactivo donde puedes escribir y ejecutar código en **celdas**.

A diferencia de los archivos de código tradicionales (`.py` en Python, por ejemplo), donde todo el código se ejecuta de arriba hacia abajo en un solo archivo, en un notebook **puedes ejecutar diferentes partes del código en distintos momentos y en cualquier orden**.

Sin embargo, todas las celdas comparten la misma **memoria** y el mismo **estado**.

## Importaciones y variables en Notebooks
Cuando ejecutas una celda en un notebook, el código dentro de esa celda **se ejecuta y se guarda en la memoria**. Esto significa que si defines una variable o importas una librería en una celda, podrás usarla en otra celda sin necesidad de repetir la importación o definición.

### Ejemplo de Importaciones
En una celda, podemos importar una librería como `math`:
``` python
import math  # Importamos la librería math
``` 

Luego, en otra celda diferente, podemos usar `math.sqrt()`, aunque no hayamos vuelto a escribir `import math`:
``` python
print(math.sqrt(25))  # Funciona porque math ya está importado en la memoria
``` 

## Error Común: Ejecutar Celdas en el orden incorrecto
Si intentamos usar algo antes de ejecutarlo, obtendremos un error.

**❌ Error típico:**
``` python
print(math.sqrt(25))  # ERROR: math no está importado aún
``` 

**✅ Solución**

Primero ejecutamos la celda donde importamos `math`, luego ejecutamos la celda con `print(math.sqrt(25))`.


> 💡 Regla Clave: El código que ejecutas en una celda queda disponible en todo el notebook, pero solo después de ejecutarlo.

## Ejercicio Paso a Paso

Sigue estos pasos para comprender mejor cómo funciona el notebook:

1. En la primera celda, importa la librería `random`:
``` python
import random
``` 

2. En la segunda celda, genera un número aleatorio usando `random.randint(1, 10)`:
``` python
numero = random.randint(1, 10)
print("Número aleatorio:", numero)
```

3. Ejecuta la segunda celda sin haber ejecutado la primera. ¿Qué pasa?

4. Ahora ejecuta la primera celda y luego vuelve a ejecutar la segunda.

> 💡 En conclusión, si ejecutas una celda con una importación o una variable, esta queda guardada en la memoria del notebook, esto quiere decir que puedes usar lo que definiste en cualquier otra celda, siempre y cuando hayas ejecutado la celda que lo definía primero. Si cierras el notebook o reinicias el kernel, perderás todo lo que estaba en la memoria y tendrás que volver a ejecutar las celdas necesarias.
