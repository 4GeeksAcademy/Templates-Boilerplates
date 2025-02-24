# 📝 VS Code Notebooks: Programación Interactiva en tu Computadora

## 📌 ¿Qué es un Notebook en VS Code?
Un **VS Code Notebook** es un tipo especial de archivo (`.ipynb`) que permite ejecutar código en **celdas**, similar a Jupyter Notebook o Google Colab. La diferencia principal es que **todo se ejecuta en tu propia computadora**, lo que significa que tienes control total sobre los recursos y el tiempo de ejecución.

✅ Ventajas de usar notebooks en VS Code:
- Puedes ejecutar código en celdas individuales sin correr todo el script.
- No dependes de internet ni de Google Colab.
- Puedes usar todo el poder de tu computadora (más RAM, CPU, y GPU si tienes una).
- Se integra con extensiones de Python y Jupyter en VS Code.

## 🛠 Cómo Usar Notebooks en VS Code

### 🔹 1. Instalación de los Requisitos
Para usar notebooks en VS Code, necesitas instalar algunas herramientas:

1️⃣ Instalar VS Code
- Descárgalo desde https://code.visualstudio.com/

2️⃣ Instalar la Extensión de Python
- Abre VS Code
- Ve a la pestaña Extensiones (Ctrl + Shift + X)
- Busca Python e instálala.

3️⃣ Instalar Jupyter en Python
- Si no lo tienes instalado, abre una terminal en VS Code y ejecuta:
``` python
pip install jupyter
```

### 🔹 2. Creando un Notebook en VS Code

1️⃣ Abre VS Code.

2️⃣ Ve a Archivo > Nuevo Archivo y guarda el archivo con extensión .ipynb.

3️⃣ Verás un entorno similar a Jupyter con celdas de código.

4️⃣ Escribe código en una celda y ejecútalo con el botón ▶️ o presionando Shift + Enter.

🖥 Ejemplo Básico en VS Code Notebooks

🔹 Celda 1: Importar Librerías
``` python
import math
```

🔹 Celda 2: Usar la librería importada
``` python
print(math.sqrt(36))  # Output: 6.0
```

💡 **Recuerda**: Al igual que en Jupyter o Colab, las celdas comparten memoria, por lo que puedes definir una variable en una celda y usarla en otra.

## ⚡ Diferencias Clave entre VS Code Notebooks y Google Colab
| Característica       | VS Code Notebooks 🖥       | Google Colab ☁️          |
|----------------------|----------------------------|--------------------------|
| Ubicación            | Computadora local          | Nube de Google           |
| Recursos             | Sin límites, depende de tu PC | Limitados               |
| Conexión a Internet  | No es necesaria            | Necesaria                |
| Acceso a GPU         | Si tienes GPU, puedes usarla con CUDA | Depende de disponibilidad |
| Tiempo de Ejecución  | Ilimitado                  | Puede desconectarse      |


## 🎯 Conclusión
📌 **VS Code Notebooks te da más control sobre tus recursos y no tiene las limitaciones de la nube**. Si trabajas en proyectos grandes o necesitas más potencia, es una mejor opción que Google Colab.

✅ **Recomendación**: Si vas a trabajar con notebooks a largo plazo, instala **VS Code y Jupyter** en tu computadora para evitar las restricciones de Google Colab. 🚀