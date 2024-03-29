---
title: 'Vanilla.js Project'
description: 'Use Webpack to compile and build a project with the latest Javascript and HTML/CSS'
---

# Starting a project in Vanilla JS

Start coding in 30 seconds by opening this template in gitpod:
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/vanillajs-hello.git)

### Manual Installation

1) Remember to install the npm packages first:
```bash
$ npm install
```

2) Build and Start coding!

Build the application for the first time...

```bash
$ npm run start
```

And start coding your Vanilla.js application, update the `src/index.html`, `src/style.css` or `src/app.js` depending on your needs.

## FAQ

#### 1) How do I run my code?

- Type on the command line `$ npm run start` and type localhost on the browser.

#### 2) Where do I write my code?
It depends on the language, but you have `./src/app.js`, `./src/style.css` and `./src/index.html` respectively, you can add new `.html` as you please, just make sure to import it on the `app.js`.

> Note: remember that the JS workflow starts inside `window.onload`.

#### 3) I don't see my changes.

Every time you change any file inside the `./src` folder the website's public URL will automatically refresh the changes (it's a process called hot deploy)
Remember also to refresh cleaning the cache (`command+shift+r` on Mac, `control+shift+r` on PC & Linux)

#### 4) How do I include more images on my project?
Add them inside the `./src/assets/img` folder and import them from any of your JS files. E.g: `import "../assets/img/rigo-baby.jpg";`

#### 5) How do I include more JS files?
Just add the files into the JS folder and import the files/variables into your `app.js`. E.g: `import myVar from "./file2.js"`

#### 6) How do I publish the website?

This boilerplate is 100% compatible with the free Github pages hosting. Publish your website by running:
```bash
$ npm run deploy
```

Very easy and in just one step! Push to your __main__ branch and use the free hosting that comes with [GitHub pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages), the project is ready to be published. Remember to choose to run the Github Page from your master branch.
