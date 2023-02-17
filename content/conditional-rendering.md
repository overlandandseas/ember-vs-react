---
title: "Conditional Rendering"
date: 2022-12-11T10:03:16-06:00
draft: false
weight: 2
caategories: templates
---

### If statements
In **jsx** there is no if helper by default, we need to use javascript code to conditionally render specific things.


<div class="flex justify-around pb4">

<div class="w-50 pr3 ember-code">

#### Ember
```html
<p>
  {{if @isOldEnough "show content" "not old enough" }}
</p>
```

</div>
<div class="w-50 pl3 react-code">

#### React
```jsx
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
</div>


### If block helper
The if block helper, `{{#if }} {{/if}}`, can be used to conditionally render large chunks of content.
In React we can use the same method for rendering if conditions.
<div class="flex justify-around pb4">

<div class="w-50 pr3 ember-code">

#### Ember
```html
<div>
  {{#if @authenticated}}
    <p>large complex content piece</p>
  {{else}}
    <p>another piece rendered in the else block</p>
  {{/if}}
</div>
```

</div>
<div class="w-50 pl3 react-code">

#### React
```jsx
export default function MyComponent({ authenticated }) {

  if (authenticated) {
    return (<p>large complex conent piece</p>)
    
  } else {
    return (<p>another piece rendered in the else block</p>)

  }
}
```
</div>
</div>


In both React and Ember, there is no addtional html elements rendered for components,
allowing us to use nested components for complex strucutres without performance loss on page render.
