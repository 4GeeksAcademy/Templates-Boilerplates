# 📒 Notebooks: Un Solo Ambiente de Trabajo
## 📌 ¿Qué es un Notebook y Cómo Funciona?
Un **notebook** (como Jupyter Notebook o Google Colab) es un entorno interactivo donde puedes escribir y ejecutar código en **celdas**.

A diferencia de los archivos de código tradicionales (`.py` en Python, por ejemplo), donde todo el código se ejecuta de arriba hacia abajo en un solo archivo, en un notebook **puedes ejecutar diferentes partes del código en distintos momentos y en cualquier orden**.

Sin embargo, todas las celdas comparten la misma **memoria** y el mismo **estado**.

## 🔹 Importaciones y Variables en Notebooks
Cuando ejecutas una celda en un notebook, el código dentro de esa celda **se ejecuta y se guarda en la memoria**. Esto significa que si defines una variable o importas una librería en una celda, podrás usarla en otra celda sin necesidad de repetir la importación o definición.

### ✍ Ejemplo de Importaciones
En una celda, podemos importar una librería como `math`:
``` python
import math  # Importamos la librería math
``` 

Luego, en otra celda diferente, podemos usar `math.sqrt()`, aunque no hayamos vuelto a escribir `import math`:
``` python
print(math.sqrt(25))  # Funciona porque math ya está importado en la memoria
``` 

## ❌ Error Común: Ejecutar Celdas en el Orden Incorrecto
Si intentamos usar algo antes de ejecutarlo, obtendremos un error.
### 🔻 Error típico:
``` python
print(math.sqrt(25))  # ERROR: math no está importado aún
``` 

### 🔺 Solución
Primero ejecutamos la celda donde importamos `math`, luego ejecutamos la celda con `print(math.sqrt(25))`.

### 💡 Regla Clave
El código que ejecutas en una celda queda disponible en todo el notebook, pero solo después de ejecutarlo.

## 🛠 Ejercicio Paso a Paso
Sigue estos pasos para comprender mejor cómo funciona el notebook:

1️⃣ En la primera celda, importa la librería `random`:
``` python
import random
``` 

2️⃣ En la segunda celda, genera un número aleatorio usando `random.randint(1, 10)`:
``` python
numero = random.randint(1, 10)
print("Número aleatorio:", numero)
```

3️⃣ Ejecuta la segunda celda sin haber ejecutado la primera. ¿Qué pasa?

4️⃣ Ahora ejecuta la primera celda y luego vuelve a ejecutar la segunda.

### ✅ Conclusión:
- Si ejecutas una celda con una importación o una variable, esta queda guardada en la memoria del notebook.
- Puedes usar lo que definiste en cualquier otra celda, siempre y cuando hayas ejecutado la celda que lo definía primero.
- Si cierras el notebook o reinicias el kernel, perderás todo lo que estaba en la memoria y tendrás que volver a ejecutar las celdas necesarias.

**📌 Resumen Final: Un notebook es un solo ambiente de trabajo donde todas las celdas comparten memoria, pero debes ejecutarlas en el orden correcto para que funcionen correctamente. 🚀**