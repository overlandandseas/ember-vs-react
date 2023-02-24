---
title: "Global State"
weight: 60
---

## Services
Ember services are singleton objects that can be used to store data and methods.
They are helpful for having functionality that is shared accross the entire app.
React has a similar concept with Providers, Reducers, and Contexts, they can be 
used in a similar way but are very different to setup.


The React docs [have an example](https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context) for a Todo application using Contexts, lets create
that side by side with an ember service that has the exact same API.

{% sidebyside() %}
<div>

#### Ember Service
```js
// services/tasks.js
import { A } from '@ember/array';
import Service from '@ember/service';

const initialTasks = [
  { text: 'Philosopher’s Path', done: true },
  { text: 'Visit the temple', done: false },
  { text: 'Drink matcha', done: false }
];

export default class TasksService extends Service {
  tasks = A(initialTasks);

  add(text) {
    this.tasks.pushObject({
      text,
      done: false
    });
  }

  remove(task) {
    this.tasks.removeObject(task);
  }

  empty() {
    this.tasks.clear();
  }
}
```
</div><div>

#### React Context
```tsx
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```
</div>
{% end %}
{% sidebyside() %}
<div>

#### Ember Components
```js
// compoents/add-task.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';


export default class AddTaskComponent extends Component {
  @service tasks;
  text;

  @action
  addTask() {
    this.tasks.add(this.text)
  }
	
}
```
```hbs
{{!-- components/add-task.hbs --}}
<Input
  placeholder="Add task"
  @value={{this.text}}
  @type="text" 
/>
<button
  {{on "click" (fn this.addTask)}}>
  Add
</button>
```
```js
// components/task-list.js
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class TaskListComponent extends Component {
  @service tasks;
}
```
```hbs
{{!-- components/task-list.hbs --}}
<ul>
  {{#each this.tasks.tasks as |task|}}
    <li>
      <Task @task={{task}} />
    </li>
  {{/each}}
</ul>
```
```js
// components/task.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class extends Component {
  @service tasks;
  @tracked isEditing = false;

  @action
  setIsEditing(isEditing) {
    this.isEditing = isEditing;
  }

  @action
  remove() {
    this.tasks.remove(this.args.task)
  }

}
```
```hbs
{{!-- components/task.hbs --}}
<Input
  @type="checkbox"
  @checked={{@task.done}}
/>
{{#if this.isEditing }}
  <Input
  	@value={{@task.text}}
    @type="text"
    />
  <button
  	role="button"
    {{on "click" (fn this.setIsEditing false) }}
  >
  	Save
  </button>
{{else}}
	{{@task.text}}
  <button role="button" {{on "click" (fn this.setIsEditing true)}}>
  	Edit
  </button>
  <button
  	role="button"
    {{on "click" (fn this.remove)}}
  >
  	Delete
  </button>
{{/if}}
```
</div><div>

#### React Components
```tsx
// AddTask.jsx
import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```
```tsx
// TaskList.jsx
import { useState } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```
</div>
{% end %}
{% sidebyside() %}
<div>

#### Ember Application Template
```hbs
{{!-- templates/application.hbs --}}
<h1>Day off in Kyoto</h1>
<AddTask />
<TaskList />
```
</div><div>

#### React App Component
```tsx
// App.jsx
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```
</div>
{% end %}