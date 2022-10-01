---
title: Service
description: Service
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/service_

## Configuration

You can back to the concept page to see overview about the configuration structure.

_Note: When you named a function, avoid following names: `name`, `settings`, `methods`, `actions`, `hooks`, `start`, `started`, `close`, `closed`, `call`, `all`._

### `name`

Should camelCase. Required.

### `settings`

An object, can be accessed as `this.settings` (inside) or `service.settings` (outside).

### `methods`

Functions.

### `actions`

Functions.

```js
{
  actions: {
    async yourAction(args, nextCall) {
      /* ... your code ...  */

      /* await nextCall(address, args, shared) */

      return /* return value */;
    }
  }
}
```

- `args` is an object which merged `args` (local args), `shared` (shared args) and custom property from hooks.
- `nextCall` is a function to call next action, you can update the shared arguments in the next action, but peer `nextCall` not change the shared.

### `hooks`

```js
{
  methods: {
    async methodName(args, nextCall){

    }
  },
  
  hooks: {
    before: { // before run action
      async all(args, nextCall) {
        /* return then break */
      },

      /* or */

      yourAction: ['methodName'],
    },
    after: { // after run action
      async all(res, args, nextCall) {
        /* manipulate res */

        return res;
      }
    },
    error: { // action error
      /* ... */
    }
  }
}
```

- In hook function, if you return anything except `undefined`, the next hook, action and after hook will be skipped.
- In after hook, you can manipulate response and return the result.
- When before + action + after throw error, error hooks will occur.

### `started`

Execute when `start` function is called.

```js
{
  async started() {
    /* ... your code ...  */
  }
}
```

### `closed`

Execute when `close` function is called.

```js
{
  async started() {
    /* ... your code ...  */
  }
}
```

## Methods

### `call`

```js
await service.call(address, args, shared);

/* or */

await this.call(address, args, shared); // in service's function

/* or */

await nextCall(address, args, shared); // in action chain
```

- `address`: Format: `<serviceName>.<actionName>`.
- `args`: Local args in next call.
- `shared`: Shared args in future call.

After this call, `args`, `shared` and previous shared is merged through order priority into `args` of action function.

If action call occur error, it throws an array of error which item is instance of `RugoException`.

### `start`

```js
await service.start();
```

### `close`

```js
await service.close();
```