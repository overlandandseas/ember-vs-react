---
title: "Component Properties"
date: 2022-12-11T11:43:57-06:00
draft: false
weight: 4
categories: component
---


### Declaring a local property
Since jsx is both javascript and template in one file, we do not need to create a seperate file to manage properties

<div class="flex justify-around pb4">

<div class="w-50 pr3 ember-code">


#### Ember
```js
// my-component.js
import Component from '@glimmer/component';
export default class MyComponent extends Component {
  value = 100;
}
```
<br>

```html
<!-- my-component.hbs -->
<p>{{this.value}}</p>
```

</div>
<div class="w-50 pl3 react-code">

#### React
```jsx
// MyComponent.jsx
export default function MyComponent() {
  let value = 100;
  return(<p>{value}</p>)
}
```
</div>
</div>

### Updating state of a local property
React hooks are a way of updating the state to indicate that we need to re-render the component,
similar to the `@tracked` attribute.

For this example we will use the `useState` hook to keep track of our local state.

<div class="flex justify-around pb4">

<div class="w-50 pr3 ember-code">


#### Ember
```js
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
<br>

```hbs
{{!-- my-component.hbs --}}
<p>Count: {{this.count}}</p>
<p>
  <button type="button" {{on "click" this.plusOne}}>
    Increment Count
  </button>
</p>
```

</div>
<div class="w-50 pl3 react-code">

#### React
```jsx
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
</div>
</div>

