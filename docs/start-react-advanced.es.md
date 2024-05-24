---
title: 'Start Flux Project'
description: 'Use the FLUX practices to build professional apps using React.js'
---

> 🎥 You can watch a full video tutorial on [how to create your React application with Context.API and Flux following this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b).

## Quick Start

Create your first view, add it to your application routes, create your first component, add styles and use the context API.

### Installation 

Make sure to follow the steps on [running the project](https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/README.md) first, then come back to this list, if you are using Gitpod or Codespaces it is possible that the project is already running.

### Add your first view

It's time to add some code: Everything starts at the application layout (`js/layout.js`), this file is like a table of contents where all of your application pages will be added before they can be rendered by React and the browser, you can [read more about React Router here](https://4geeks.com/lesson/routing-our-views-with-react-router).

We already added a few routes like `Home`, `Demo` and `Single`, these views are useful examples of the most frequent things you usually need in a project.

All of your application pages will be added into the `js/pages` folder, each of them will be a separate React component.

Let's open the `<Demo>` view at `js/pages/demo.js`.

### Code your first HTML view

As you can see, the `demo.js` page is just a React component, here are additional things to notice:

- The component returns HTML.
- At the start of the component file (demo.js) there are two imports: The `AppContext` that will be used for dealing with any global information needed from other views or the application; And the `demo.css` that will be used to add any CSS classes and styles used on this view in particular.
- It's also important to mention that the AppContext is declared inside the component, on the very first couple of lines:

```js
const { store, actions } = useContext(Context);
```

### Adding styles to views or components

All the application styles are saved inside the `styles` folder, we usually have a separate style for each component.

You can update the `styles/index.css` or create new `.css` files inside `styles/` and import them into your current CSS or JS files depending on your needs.

For example, if you would want to create a class `background-blue` that makes the home background blue you need to do something like this:

- Add the class `.background-blue` into the `styles/home.css`.
- Use your class by adding the `<div className="background-blue">` into your HTML page at `js/pages/home.js`.

### Creating your first component

Usually you want most of your HTML application to be split into components that can be re-used.
	
All the components are meant to be created into the `js/components` and then you can import them into the pages that will use them.

> 📝 We are using functional components (instead of class oriented components) since it's the best practice in the industry.
	
For example, if we want to add a new `<Card>` component that replicates the [classic bootstrap card](https://getbootstrap.com/docs/5.0/components/card/), we can create a `js/components/Card.js` with the following code:

```jsx
export const Card = () => (
	const [state, setState] = useState('code here'); //using the state (if needed)
	return <div className="card">
	  <div className="card-body">
	    <h5 className="card-title">Card title</h5>
	    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
	    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
	  </div>
	</div>
);
```

### Adding components to our pages

Now that we have the `Card` component we can incorporate it to our `Home.js` page with the following steps:

1. Import the component at the top of the page.
2. Use the component `<Card>` tag inside the HTML that your page returns, for example:

```jsx
import { Card } from "../component/Card.js";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<Card />
		</div>
	);
};
```

**Important notes**

- It's important to use the curly brackets `{` when importing the component like this: `{ Card }`.
- Notice the `<Card />` tag being used in line 9 of the `Home.js` file.

### Using the Context

This boilerplate comes with a centralized general Context API. The file `js/store/flux.js` has a base structure for the store, we encourage you to change it and adapt it to your needs.

- React Context [docs](https://react.dev/reference/react/useContext).
- 4Geeks Lesson about [React hooks](https://content.breatheco.de/lesson/react-hooks-explained).

The `Provider` is already set. You can consume from any component using the `useContext` hook to get the `store` and `actions` from the Context. Check `/views/demo.js` to see a demo.

```jsx
import { Context } from "../store/appContext";

const MySuperPage = () => {
  //here you use useContext to get store and actions
  const { store, actions } = useContext(Context);

return <div>{/* you can use your actions or store inside the html */}</div>
}
```

## Publish your website!

1. **Vercel:** The FREE recommended hosting provider is [vercel.com](https://vercel.com/), you can deploy in 1 minute by typing the following 2 commands:

Login (you need to have an account):
```bash
$ npm i vercel -g && vercel login
```
Deploy:
```bash
$ vercel --prod
```
> ✎ Note: If you don't have an account just go to vercel.com, create an account and come back here.

![Vercel example procedure to deploy](https://github.com/4GeeksAcademy/react-hello-webapp/blob/4b530ba091a981d3916cc6e960e370decaf2e234/docs/deploy.png?raw=true)

2. **Github Pages:** This boilerplate is 100% compatible with the free Github pages hosting.
To publish your website you need to push your code to your Github repository and run the following command after:
```bash
$ npm run deploy
```
> 👉 Note: You will need to [configure Github pages for the branch gh-pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages)

## Running the project:

> Note: Make sure you are using node version 14+

1. Install the packages:
```bash
$ npm install
```
2. Create a .env file:
```bash
$ cp .env.example .env
```
3. Start coding! and use the webpack dev server with live reload, for Windows, Mac, Linux or Gitpod:

```bash
$ npm run start
```
