---
title: Fx
description: Fx
layout: ../../layouts/MainLayout.astro
---

## Introduce

We define Rugo Fx into two terms:

- Fx: A code runner.
- Fx(R): A code runner with Rugo enviroment, uses `@rugo-vn/service`.

## Fx

### Concept

_A code runner._

- You can run your code in many types:
  + `js`: Default javascript code. It returns any data with `return` keywords.
  + `ejs`: Template engine. It returns a rendered string.
- You can call other file with: `include` function.

### Usage

**Directly**

```js
const res = await Fx.run('Your code'/*, opts */);
```

`opts`:
- `async get(name)`: get function to get code by name.
- `{string} type`: `js` or `ejs`. Default: `js`.
- `{string} mode`: (Default: `block`)
  + `block` should have `return` keyword in code to return data
  + `inline` it returns value directly
  + `file` using with `get` function defined. When `file` mode, `Your code` is your file name, `type` depends on file's ext. After load, this code will be run as `block` mode.
- `{object} locals` using in code context.

**Instance**

```js
const fx = new Fx(/* global opts */);
const res = await fx.run('Your code'/*, opts */);
```

You can define opts in globals, when you call run, it will merge them by local `opts` priority.

### `file` mode

- When use `file` with mode, it will call `get`, which defined in your config, to get content and run it.
- In `file` mode, you can call `include` to extend your file.

```js
const fx = new Fx({
  async get(name){
    /* do something to get your file */

    return /* your file content */;
  }
});

const res = await fx.run('abc.js', { mode: 'file' });
```

For these files:

```js
// abc.js
const content = await include('hello.ejs');

return {
  data: '<h1>' + content + '</h1>'
};
```

```js
// hello.ejs

<%= await include('hello.txt') %>
```

```js
// hello.txt

Hello World
```

### Locals

- Codes share globals and local `opts.locals`.
- If two `locals` provided, it merge them with local priotity.
- You can pass `locals` to `include` function, it will merge new `locals` and parent `locals` with new priotity.

```js
await include('abc.ejs', { some: 'thing' });
```

## Fx(R)

### Settings

```js
{
  'fx': {
    get: { // define get function
      action: /* action address */,
      args: 
    },
    locals: { /* global locals */ }
  }
}
```

### Concept

```js
this.call('fx.run', { name: 'Your file name' });
```

