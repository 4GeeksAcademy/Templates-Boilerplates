# 📒 Notebooks: A Single Workspace
## 📌 What is a Notebook and How Does It Work?
A **notebook** (like Jupyter Notebook or Google Colab) is an interactive environment where you can write and execute code in **cells**.

Unlike traditional code files (`.py` in Python, for example), where all the code runs from top to bottom in a single file, in a notebook **you can run different parts of the code at different times and in any order**.

However, all cells share the same **memory** and the same **state**.

## 🔹 Imports and Variables in Notebooks
When you run a cell in a notebook, the code inside that cell **executes and is stored in memory**. This means that if you define a variable or import a library in one cell, you can use it in another cell without needing to repeat the import or definition.

### ✍ Example of Imports
In one cell, we can import a library like `math`:
``` python
import math  # We import the math library
``` 

Then, in a different cell, we can use `math.sqrt()`, even if we haven't rewritten `import math`:
``` python
print(math.sqrt(25))  # Works because math is already imported in memory
``` 

## ❌ Common Error: Running Cells in the Wrong Order
If we try to use something before running it, we will get an error.
### 🔻 Typical Error:
``` python
print(math.sqrt(25))  # ERROR: math is not imported yet
``` 

### 🔺 Solution
First, run the cell where we import `math`, then run the cell with `print(math.sqrt(25))`.

### 💡 Key Rule
The code you run in a cell becomes available throughout the notebook, but only after you run it.

## 🛠 Step-by-Step Exercise
Follow these steps to better understand how the notebook works:

1️⃣ In the first cell, import the `random` library:
``` python
import random
``` 

2️⃣ In the second cell, generate a random number using `random.randint(1, 10)`:
``` python
number = random.randint(1, 10)
print("Random number:", number)
```

3️⃣ Run the second cell without running the first one. What happens?

4️⃣ Now run the first cell and then run the second one again.

### ✅ Conclusion:
- If you run a cell with an import or a variable, it is stored in the notebook's memory.
- You can use what you defined in any other cell, as long as you have run the cell that defined it first.
- If you close the notebook or restart the kernel, you will lose everything that was in memory and will have to run the necessary cells again.

**📌 Final Summary: A notebook is a single workspace where all cells share memory, but you must run them in the correct order for them to work properly. 🚀**