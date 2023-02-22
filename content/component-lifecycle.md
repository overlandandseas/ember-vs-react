---
title: "Component Lifecycle"
weight: 50
---

## Initialization

Because Ember uses classes, we need to use the `constructor()` method to run some code on initialization.
With React, anything written in the body of the function will run every time the component re-renders,
similar to `didRecieveAttrs`. To run code once per component initialization, the `useEffect` hook is needed.

{% sidebyside() %}
<div>

#### Ember

```js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
  constructor() {
    super(...arguments);
    console.log("Component initialized");
  }
}
```
</div><div>

#### React

```tsx
import { useEffect } from 'react';

export default function MyComponent() {
	useEffect(() => {
		console.log("Component initialized");
	}, []) // Empty array as the second parameter means run this effect once. 
}
```
</div>
{% end %}

## Deconstructor

Ember Octane (Glimmer components) can run code when destroying the component using the
`willDestroy` method. React can run code when destroying (unmounting) a component,
this is done using the same `useEffect` hook. The hook’s return value can be a function,
this function is called once the component unmounts and the effect is destroyed.

{% sidebyside() %}
<div>

#### Ember

```js
import Component from '@glimmer/component';

export default class MyComponent extends Component {
	willDestroy() {
		console.log("Cleanup code..");
	}
}
```
</div><div>

#### React

```tsx
import { useEffect } from 'react';

export default function MyComponent({ firstName, lastName }) {
	useEffect(() => {
		// Avoid having multiple useEffect hooks, the setup code should 
		// be run in the same block as the cleanup code.
		return () => {
			console.log("Cleanup code..")
		}
	}, []);
}
```
</div>
{% end %}

## Modifiers vs Hooks

Ember modifiers allow us to attach functions to different portions of the ember rendering cycle, this is similar to the various react hooks we get access to.

### did-insert

{% sidebyside() %}
<div>

#### Ember

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action modifyElement(element) {
    // You have the element.
  }
}
```

```hbs
<canvas {{did-insert this.modifyElement}}></canvas>
```
</div><div>

#### React

```tsx
import { useEffect } from 'react';

export default function MyComponent() {
	const element = <canvas></canvas>
	useEffect(() => {
		// Have access to the element here.
	}, []);
	return element;
}
```
</div>
{% end %}

### did-update

{% sidebyside() %}
<div>

#### Ember

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @action
  resizeArea(element) {
    element.style.height = `${element.scrollHeight}px`;
  }
}
```

```hbs
<textarea {{did-update this.resizeArea @text}}>
  {{@text}}
</textarea>
```
</div><div>

#### React

```tsx
import { useEffect } from 'react';

export default function MyComponent({ text }) {
	const element = (<textarea></textarea>)
	useEffect(() => {
		element.style.height = `${element.scrollHeight}px`;
	}, [text]);
	return element;
}
```
</div>
{% end %}