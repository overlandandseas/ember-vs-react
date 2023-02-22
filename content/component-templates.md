---
title: "Component Templates"
date: 2022-12-09T21:57:08-06:00
draft: false
weight: 1
categories: component
---

## Component Usage

In ember, all components are in a global namespace, we do not need to import then at all,
this is different from React that requires the Component to be imported like a library or module.
Rendering the component is similar to ember octanes angle bracket syntax.

<div class="lg:flex justify-around lg:space-x-4">
<div class="lg:w-1/2 ember">


#### Ember
```hbs
<!-- application.hbs -->
<MyComponent />
```
</div>

<div class="lg:w-1/2 react">

#### React
```tsx
// App.tsx

// import component like js module
import MyComponent from './components/MyComponent';

export default function App() {
  return (
    <MyComponent />
  )
}
```

</div>
</div>

## Block components

Block components are done in a similar way between React and Ember. 
In React there a reserve parameter `children` that contains the contents of the inner html elements.

<div class="lg:flex justify-around lg:space-x-4">
<div class="lg:w-1/2 ember">


#### Ember
```hbs
<!-- outer-component.hbs -->
<InnerComponent>
  <p> Inner Content is rendered here </p>
</InnerComponent>
```
  
```hbs
<!-- inner-component.hbs -->
<div>
 {{outlet}}
</div>
```
</div>

<div class="lg:w-1/2 react">

#### React
```tsx
// OuterComponent.tsx
import InnerComponent from './components/InnerComponent';

export default function OuterComponent() {
  return (
    <InnerComponent>
      <p>Inner content is rendered here.</p>
    </InnerComponent>
  )
}
```
  
```tsx
// InnerComponent.tsx
export default function InnerComponent({ childen }) {
  return (
    <div>{childen}</div>
  )
}
```

</div>
</div>

## Component Arguments

Passing arguments is done through element attributes in React and Ember.
React arguments, otherwise known as **props**, 
are passed into the function component via the field name of the first parameter.

<div class="lg:flex justify-around lg:space-x-4">
<div class="lg:w-1/2 ember">


#### Ember
```hbs
<!-- outer-component.hbs -->
<InnerComponent @name={{"John"}} />

<!-- inner-component.hbs -->
{{@name}}
```
</div>

<div class="lg:w-1/2 react">

#### React
```tsx
// OuterComponent.tsx
import InnerComponent from './components/InnerComponent';

export default function OuterComponent() {
  return (
    <InnerComponent name={"John"} />
  )
}

// InnerComponent.tsx
export default function InnerComponent({ name }) {
  
  return (<>{props.name}<>)
}
```

</div>
</div>

### Multi-component Files
Since React doesn't scope things by file, but by functions using js imports, we can create multiple components in one file.
This can be used to create *private* components that can only be used by the ones we export.
*This is not possible in Ember.*

#### React
```tsx
// MyComponent.tsx
export default function MyComponent({ message }) {
  return (<>
    <p>{message.body}</p>
    <FormattedDate date={mesage.date} />
  </>)
}

function FormattedDate({ date }) {
  const formatted = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  return (<aside>{formatted}</aside>)
}

```

The component `FormatttedDate` cannot be used outside of this file since it is never exported.
