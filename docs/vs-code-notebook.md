---
title: 'VS Code Notebooks: Interactive Programming on Your Computer'
description: 'Learn how to use VS Code Notebooks to run code on your local computer, making the most of your resources without relying on the cloud.'
technologies: ['python', 'vs-code', 'jupyter-notebook']
---


## 📌 What is a Notebook in VS Code?
A **VS Code Notebook** is a special type of file (`.ipynb`) that allows you to run code in **cells**, similar to Jupyter Notebook or Google Colab. The main difference is that **everything runs on your own computer**, meaning you have full control over resources and execution time.

✅ Advantages of using notebooks in VS Code:
- You can run code in individual cells without running the entire script.
- You don't depend on the internet or Google Colab.
- You can use all the power of your computer (more RAM, CPU, and GPU if you have one).
- It integrates with Python and Jupyter extensions in VS Code.

## How to Use Notebooks in VS Code?

### Installing the Requirements
To use notebooks in VS Code, you need to install some tools:

1. Install VS Code. Download it from https://code.visualstudio.com/

2. Install the Python Extension
- Open VS Code
- Go to the Extensions tab (Ctrl + Shift + X)
- Search for Python and install it.

3. Install Jupyter in Python
- If you don't have it installed, open a terminal in VS Code and run:

    ``` python
    pip install jupyter
    ```

### Creating a Notebook in VS Code

1. Open VS Code.

2. Go to File > New File and save the file with the .ipynb extension.

3. You will see an environment similar to Jupyter with code cells.

4. Write code in a cell and run it with the ▶️ button or by pressing Shift + Enter.


## Basic Example in VS Code Notebooks

- Cell 1: Import Libraries
    ``` python
    import math
    ```

- Cell 2: Use the imported library
    ``` python
    print(math.sqrt(36))  # Output: 6.0
    ```

> 💡 **Remember**: Just like in Jupyter or Colab, cells share memory, so you can define a variable in one cell and use it in another.


## ⚡ Key Differences between VS Code Notebooks and Google Colab

| Feature              | VS Code Notebooks 🖥       | Google Colab ☁️          |
|----------------------|----------------------------|--------------------------|
| Location             | Local computer             | Google Cloud             |
| Resources            | Unlimited, depends on your PC | Limited                 |
| Internet Connection  | Not necessary              | Necessary                |
| GPU Access           | If you have a GPU, you can use it with CUDA | Depends on availability |
| Execution Time       | Unlimited                  | Can disconnect           |


**VS Code Notebooks give you more control over your resources and do not have the limitations of the cloud**. If you work on large projects or need more power, it is a better option than Google Colab.