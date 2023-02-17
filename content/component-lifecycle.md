---
title: "Component Lifecycle"
date: 2023-01-08T11:33:41-06:00
weight: 5
categories: component
---

### Constructor / useEffect
Ember component being classes allows us to use the component's `constructor` method
to run code. In react we use the `useEffect` hook without any dependencies to run code once.
<div class="lg:flex justify-around lg:space-x-4">

<div class="lg:w-1/2 ember">


#### Ember
```js
// my-component.js
import Component from '@glimmer/component';
export default class MyComponent extends Component {

  constructor(owner,args) {
    super(owner, args);
    console.log("run once at component initalization");
  }
}
```

</div>
<div class="lg:w-1/2 react">

#### React
```tsx
// MyComponent.jsx
export default function MyComponent() {

  useEffect(() => {
    console.log("run once at component initialization");
  }, []);
  return(<p>My Component</p>)
}
```
</div>
</div>


### willDestroy vs useEffect cleanup hook
In order to run code when a component is destroyed we can use the `willDestroy` method in ember.
On the react side, in any effect there are such things called clea
<div class="lg:flex justify-around lg:space-x-4">

<div class="lg:w-1/2 ember">


#### Ember
```js
// my-component.js
import Component from '@glimmer/component';
export default class MyComponent extends Component {

  willDestroy() {
    console.log("run once when component being destroyed");
  }
}
```

</div>
<div class="lg:w-1/2 react">

#### React
```tsx
// MyComponent.jsx
export default function MyComponent() {

  useEffect(() => {
     return () => console.log("run once when effect being destroyed");
  }, []);
  return(<p>My Component</p>)
}
```
</div>
</div>
