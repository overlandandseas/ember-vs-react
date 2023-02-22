---
title: "Component Properties"
date: 2022-12-11T11:43:57-06:00
draft: false
weight: 4
---

## Declaring a local property

Since JSX is both javascript and template in one file, we do not need to create a separate file to manage properties.
In React a property in a component is a variable that's been initialized inside the component function body.

#### Ember

```js
// my-component.js
import Component from '@glimmer/component';
export default class MyComponent extends Component {
  value = 100;
}

```

```hbs
<!-- my-component.hbs -->
<p>Value: {{this.value}}</p>

```

#### React

```jsx
// MyComponent.jsx
export default function MyComponent() {
  let value = 100;
  return(<p>Value: {value}</p>)
}

```

This is where we start to see the benefits of Jsx since everything about one component is stored in one file.

## Actions / Component Functions

In Ember, we define actions in component files using the `@action` decorator, in React there is no need, all functions can be considered actions.
Calling the function is similar, we assign it via attributes.

### Ember

```
// my-component.js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {

  @action log() {
    console.log('Log called');
  }
}

```

```
<button type="button" {{on "click" this.log}}>
  Log
</button>

```

### React

```
// MyComponent.tsx
export default function MyComponent() {
  const log = () => console.log('Log called');

  return (
    <button type="button" onClick={log()}>
      Log
    </button>
  }
}

```

## Updating the state of a local property

React hooks are a way of updating the state to indicate that we need to re-render the component,
similar to the `@tracked` attribute.

For this example, we will use the `useState` hook to keep track of our local state.

### Ember

```
// my-component.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @tracked count = 0;

  @action increment() {
    this.count++;
  }
}

```

```
{{!-- my-component.hbs --}}
<p>Count: {{this.count}}</p>
<p>
  <button type="button" {{on "click" this.plusOne}}>
    Increment Count
  </button>
</p>

```

### React

```
// MyComponent.jsx
import { useState } from "react";

export default function MyComponent() {
  let [count, setCount] = useState(0);

  // We can also declare a location function to save clutter
  return (
    <>
      <p>Count: {count}</p>
      <p>
        <button type="button" onClick={setCount(count + 1)}>
          Increment Count
        </button>
      </p>
    </>
  );
}

```

### Computed Get Method

In Ember, we use native javascript `get` combined with the `@computed` decorator to 

#### Ember

```jsx
// my-component.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed, set } from '@ember/object';

export default class MyComponent extends Component {

	@computed('args.firstName', 'args.lastName')
  get fullName() {
    return `${this.args.firstName} ${this.args.lastName}`;
  }
}
```

```jsx
{{!-- my-component.hbs --}}
<p>{{this.fullName}}</p>
```

#### React

```jsx
// MyComponent.jsx
export default function MyComponent({ firstName, lastName }) {
	const fullName = `${firstName} ${lastName}`;

	return (<p>{fullName}</p>)
}
```

React will re-render the entire component each time a parameter is changed, this is good for simplicity, however, this means we should keep components pure, [this doc on “Keeping Components Pure”](https://beta.reactjs.org/learn/keeping-components-pure) is a good reference to the intentions of React components.