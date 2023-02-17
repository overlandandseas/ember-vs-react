---
title: "Introduction"
date: 2022-12-09T20:47:09-06:00
draft: false
weight: 0
---


## Generating a new project

React is not as much of a framework as Ember, the examples below are shown with a minimal React setup.
If looking for a full featured framework with React, try <b>Nextjs</b>.
These examples will work in Next as they only focus on core component features.

When starting a new poject in ember we can use the ember cli tool. In react there are many tools that are used to create new react projects.
For this we can use **Vite**, a bundler that includes a lot of the same tools the ember cli does: dev server, 
auto reloading, bundler and compiler/build tool.


<div class="lg:flex justify-around lg:space-x-8">
<div class="lg:w-1/2 ember">

#### Ember
```bash
ember new project-name --lang en
```
</div>
<div class="lg:w-1/2 react">

#### React
```bash
npm create vite@latest project-name -- --template react-ts
```
</div>
</div>

### Dev server

Both Ember and React typically will have the same development server command, verify in `package.json` or documentation.

#### Both
```bash
npm run dev
```

## Creating components

In ember, we use the ember-cli to use generate new component and other entities.
React by default doesn't have a generator or a cli tool, we can create the files manually.

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

## Directory structre

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


