---
title: Server
description: Server
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/server_

## Concept

- This module is a service created by `@rugo-vn/service`.
- Koa server with `koa-qs` to parse querystring, and `koa-body` to parse body then send it to driver's tmp directory.

## Settings

```js
{
  server: {
    port: /* port for server mount to */,
    prepare: /* prepare action to compose args and shared */,
    routes: [ /* routing list */
      {
        method: /* method of http, based on KoaJS */,
        path: /* path to route, based on KoaJS */,
        action: /* address to service's action */,
      }
    ],
    shared: {
      /* default shared */
    }
  }
}
```

## Arguments

- `method`
- `path`
- `params`
- `form` body of request, which include text and binary file as file path.
- `query`
- `headers`
- `cookies`

## Response

**`200 OK` text response**

Each service's action defined in routes should have response with below format:

```js
{
  data: /* response data */,
  meta: {
    headers: {
      [field]: value, // string value
    },
    cookies: {
      [name]: value, // as string
      /* or */
      [name]: { value, ...opts }, // as object with opts
    }
  }
}
```

In model raw:

```js
{
  data: {
    data: // driver response
    meta: {
      // model meta
    }
  },
  meta: {
    /* ... */
  }
}
```

**Binary response**

```js
{
  data: /* location of file in server */,
  meta: {
    type: 'file',
    /* ... */
  }
}
```

**Other responses**

If you need another status response, you should throw an error that extends of `RugoException`.

## Start

Because this is a start point, which call other services with `this`, so it needs to pass some shared arguments.

From the settings, take a clone of `shared` property and send it as shared arguments.