---
title: 'Start a new HTML/CSS Project'
description: 'Build and publish the most basic HTML/CSS website you can build'
technologies: ['html', 'css', 'python','javascript']
---

The most basic template for any 4Geeks Academy Student, ideal for starting your first HTML/CSS website.

## If you are **working locally**

- Download and [install python using pyenv](https://4geeks.com/how-to/what-is-pyenv-and-how-to-install-pyenv) (recommended).
- Download the repository template.  

## If you are working from Codespaces or Gitpod

Just click on [this link to start your project](https://s.4geeks.com/start?repo=https://github.com/4GeeksAcademy/html-hello.git) using our One-Click Coding technology.

[![How to open html/css preview of my project](https://github.com/4GeeksAcademy/Templates-Boilerplates/blob/master/static/img/preview.png?raw=true)](https://youtu.be/dfbDCMu_p-0)

## What to do next?

Create a `index.html` file with the [basic HTML structure](https://4geeks.com/lesson/what-is-html-learn-html#page-structure) and see it live by running web-server using the following command:

```bash
pip install flask && python server.py
```

- You can create as many HTML files you want
- You can also create CSS files and you can import them onto your website using a `<link>` tag placed between the `<head></head>` tags, like this:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="styles.css">
  ...
</head>
```
