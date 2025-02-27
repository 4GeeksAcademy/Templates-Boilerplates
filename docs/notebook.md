---
title: 'Notebooks: A Single Workspace'
description: 'Learn what a notebook is, how it works, and how to handle imports and variables in this interactive environment. Discover common errors and how to avoid them to work efficiently in notebooks like Jupyter Notebook and Google Colab.'
technologies: ['python', 'jupyter-notebook', 'google-colab']
---

## What is a Notebook and How Does It Work?
A **notebook** (like Jupyter Notebook or Google Colab) is an interactive environment where you can write and execute code in **cells**.

Unlike traditional code files (`.py` in Python, for example), where all the code is executed from top to bottom in a single file, in a notebook **you can execute different parts of the code at different times and in any order**.

However, all cells share the same **memory** and the same **state**.

## Imports and Variables in Notebooks
When you execute a cell in a notebook, the code inside that cell **is executed and stored in memory**. This means that if you define a variable or import a library in one cell, you can use it in another cell without needing to repeat the import or definition.

### Example of Imports
In one cell, we can import a library like `math`:
``` python
import math  # We import the math library
``` 

Then, in a different cell, we can use `math.sqrt()`, even though we haven't rewritten `import math`:
``` python
print(math.sqrt(25))  # Works because math is already imported in memory
``` 

## Common Error: Executing Cells in the Wrong Order
If we try to use something before executing it, we will get an error.

**❌ Typical Error:**
``` python
print(math.sqrt(25))  # ERROR: math is not imported yet
``` 

**✅ Solution**

First, execute the cell where we import `math`, then execute the cell with `print(math.sqrt(25))`.

> 💡 Key Rule: The code you execute in a cell becomes available throughout the notebook, but only after you execute it.

## Step-by-Step Exercise

Follow these steps to better understand how the notebook works:

1. In the first cell, import the `random` library:
``` python
import random
``` 

2. In the second cell, generate a random number using `random.randint(1, 10)`:
``` python
numero = random.randint(1, 10)
print("Random number:", numero)
```

3. Execute the second cell without having executed the first one. What happens?

4. Now execute the first cell and then re-execute the second one.

> 💡 In conclusion, if you execute a cell with an import or a variable, it is stored in the notebook's memory, meaning you can use what you defined in any other cell, as long as you have executed the cell that defined it first. If you close the notebook or restart the kernel, you will lose everything that was in memory and will need to re-execute the necessary cells.
