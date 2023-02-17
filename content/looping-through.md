---
title: "Looping Through Content"
date: 2022-12-11T10:23:14-06:00
draft: false
weight: 1
---

## Rendering lists
Since React does not include any helpers, we cannot use the `{{#each}}` helper and need to create a list of items we
want using javascript, for this example we are using the `.map()` method but any function that will return our elemets will work.

<div class="lg:flex justify-around lg:space-x-8">

<div class="lg:w-1/2 ember">

#### Ember
```hbs
<div>
  {{#each @messages as |msg|}}
    <Message @message={{msg}} />
  {{/each}}
</div>
```

</div>
<div class="lg:w-1/2 react">

#### React
```tsx
import Message from "./components/Message";

export default function MyComponent({ messages }) {
  return (
    <div>
      {messages.map(msg => (
        <Message message={msg} />
      ))}
    </div>
  );
}
```
</div>
</div>

### Filtering lists
The ability to use javacript to render content makes it easy when doing more complex renders like `filter`


<div class="lg:flex justify-around lg:space-x-8">

<div class="lg:w-1/2 ember">

#### Ember
```hbs
<div>
  {{#each @messages as |msg|}}
    {{#if msg.unread}}
      <Message @message={{msg}} />
    {{/if}}
  {{/each}}
</div>
```

</div>
<div class="react lg:w-1/2">

#### React
```tsx
import Message from "./components/Message";

export default function MyComponent({ messages }) {
  return (
    <div>
      {messages
        .filter((x) => x.unread)
        .map((msg) => (
          <Message message={msg} />
        ))}
    </div>
  );
}
```
</div>
</div>
