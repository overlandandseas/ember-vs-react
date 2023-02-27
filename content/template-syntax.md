---
title: "Template Syntax"
date: 2022-12-11T10:03:16-06:00
draft: false
weight: 2
---

## Conditional Rendering
In **jsx** there is no **if** helper by default, we need to use javascript code to conditionally render specific things.


{% sidebyside() %}
<div>

#### Ember
```hbs
<p>
  {{if @isOldEnough "show content" "not old enough" }}
</p>
```
</div><div>

#### React
```tsx
export default function MyComponent({ isOldEnough }) {

  // a local variable may also be utilized to reduce clutter
  if (isOldEnough) {
    return (<p>show content</p>)
  
  } else {
    return (<p>not old enough</p>)

  }
}
```
</div>
{% end %}


## If block helper
The if block helper, `{{#if}} {{/if}}`, can be used to conditionally render large chunks of content.
In React we can use the same method for rendering if conditions.

{% sidebyside() %}
<div>

#### Ember
```hbs
<div>
  {{#if @authenticated}}
    <p>large complex content piece</p>
  {{else}}
    <p>another piece rendered in the else block</p>
  {{/if}}
</div>
```
</div><div>

#### React
```tsx
export default function MyComponent({ authenticated }) {

  if (authenticated) {
    return (<p>large complex conent piece</p>)
    
  } else {
    return (<p>another piece rendered in the else block</p>)

  }
}
```
</div>
{% end %}


However in react we can create a **if** block component to be comparable to the `{{if}}` helper in ember.
> This is not recommended since it will render the both branch components reguardless of conditional value.


#### React
```tsx
// conditional-utils.tsx
export function If({ condition: Boolean, children: JSX.Element }) {
  if (condition) {
    return ({children})
  }
}

export function Unless({ condition: Boolean, children: JSX.Element }) {
  if (!condition) {
    return ({children})
  }
}
```


```tsx
// MyComponent.tsx
import { If, Unless } from './conditonal-utils';

export default function MyComponent() {

  const showStatus = false;

  return (<>
    <If condition={showStatus}>
      <p> Showing Status</p>
    </If>
    <Unless condition={showStatus}>
      <p>No Status</p>
    </Unless>
  </>)
}
```


In both React and Ember, there is no addtional html elements rendered for components,
allowing us to use nested components for complex strucutres without performance loss on page render.



## Rendering lists
Since React does not include any helpers, we cannot use the `{{#each}}` helper and need to create a list of items we
want using javascript, for this example we are using the `.map()` method but any function that will return our elements will work.

<div class="lg:flex justify-around lg:space-x-8">

<div class="lg:w-1/2 ember">

#### Ember
```hbs
{{#each @messages as |msg|}}
  <Message @message={{msg}} />
{{/each}}
```

</div>
<div class="lg:w-1/2 react">

#### React
```tsx
import Message from "./components/Message";

export default function MyComponent({ messages }) {
  return (
    <>
      {messages.map(msg => (
        <Message key={msg} message={msg} />
      ))}
    </>
  );
}
```
</div>
</div>

## Filtering lists
Since JSX is using javascript to render our temaplates, we can use methods like `.filter()` to remove unwanted items from a list.
We can also do before the return statement to make cleaner.

<div class="lg:flex justify-around lg:space-x-8">

<div class="lg:w-1/2 ember">

#### Ember
```hbs
{{#each @messages as |msg|}}
  {{#if msg.unread}}
    <Message @message={{msg}} />
  {{/if}}
{{/each}}
```

</div>
<div class="react lg:w-1/2">

#### React
```tsx
import Message from "./components/Message";

export default function MyComponent({ messages }) {
  const messageElements = messages
    .filter(x => x.unread)
    .map(msg => <Message key={msg} message={msg} />);

  return (<>
    {messageElements}
  </>);
}
```
</div>
</div>
