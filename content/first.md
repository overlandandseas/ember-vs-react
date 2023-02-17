---
title: "Generating Files"
date: 2022-12-09T20:47:09-06:00
draft: false
weight: 0
---

## Creating a new Component

In ember, we use the ember-cli to use generate new component and other entities.
React by default doesn't have a generator or a cli tool, we need to create the files manually.

<div class="lg:flex justify-around lg:space-x-8">

<div class="lg:w-1/2 ember">

#### Ember
```bash
ember generate component my-component

```

</div>
<div class="lg:w-1/2 react">

#### React
```bash
# component filename convention is CapitalCamelCase
touch src/components/MyComponent.tsx
```
</div>
</div>

## Component Directory Structre

In ember, we have two files to represent a component: the js file and hbs file. 
If not using **pods** then we have two files co-located in the same location.
React has one file per component _(jsx)_.
<div class="lg:flex justify-around lg:space-x-8">
<div class="lg:w-1/2 ember">


#### Ember
```bash
app/
  components/
    my-component.hbs
    my-component.js
```
</div>

<div class="lg:w-1/2 react">

#### React
```bash
src/
  components/
    MyComponent.jsx  
    # (or .tsx for typescript)   
```

</div>
</div>

