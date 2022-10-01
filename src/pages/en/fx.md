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
  + `.js`: Default javascript code. It returns any data with `return` keywords.
  + `.ejs`: Template engine. It returns a rendered string.
- You can call other file with: `include` function.

For example, we have three file:

```js
// index.js
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

And main JS to run Fx.

```js
const fx = new Fx(/* some config */);
fx.run('index.js');
```

### Configs

```js
{
  contents: {
    'index.js': /* content */,
    'hello.ejs': /* content */,
    'hello.txt': /* content */,
  }
}
```


## Fx(R)

### Concept

```js
this.call('fx.run', {
  get: {
    action: 'model.get',
    args: { schema, _id: 'filename + ".tmp"' }
  }
});
```

### `run`

Arguments:

- `{[object]} schemas`
- `{object} authSchema`
- `{string} data` code data

Return:

- `{object}` cleaned vm context


## Example

Fx instance:

```js
const user = await fx.model('users').get('userId');

const PostModel = fx.model('posts');
const post = await PostModel.get('postId');
```

Use case: 

```html
<html>
  <head>
    <title><%= post.name %></title>
  </head>
</html>
```