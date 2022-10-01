---
title: Concepts
description: Rugo definition
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/service_

An idea come from [Moleculer](https://moleculer.services/) library. We had used this library, but some of them not suitable with our idea, so we built `@rugo-vn/service`.

## Service

The definition is an object or module exports.

```js
{
  name: 'requiredNameInCamelCase',
  settings: {
    /* ... */
  },
  methods: {
    async methodName(/* ... */) {
      /* ... */
    },

    /* ... */
  },
  actions: {
    async actionName(/* ... */) {
      /* ... */
    },

    /* ... */
  },
  hooks: {
    /* ... */
  },

  async started(/* ... */) {
    /* ... */
  },

  async closed(/* ... */) {
    /* ... */
  },
}
```

After service is created, it's using the service object scope instead of service definition object.

![Convent service definition to service object and scope.](/images/s-def-to-s.png)
_Convent service definition to service object and scope._

- `name`, `methods`, `settings`, `call` can be accessed anywhere.
- `start`, `close` method only access in the parent declared code.
- `actions`, `hooks` is used with call method.

## Broker

This is a special service that used to prepare environment for another services.

![Broker structure](/images/broker.png)
_Broker structure._

- Broker contains many services, which can me callable with each others.
- It can open port for other brokers connect to, or connect to others.
- It using `rugo.config.js` as a configuration file, also read from `.env` file or `environment variable`.

![Broker connection](/images/broker-connect.png)
_Broker connection._

- Broker can reach `services` onlyin the other brokers connect to only, no nested. For example, in the connection below, `brokerD` can call all services in `brokerA`, **can not** call services in `brokerB` and `brokerC`. This avoid infinity loop and security problems.

## Action Chain

You can start callable chain by `this.call` in any service's function.

![Action calls](/images/action-call.png)
_Action calls._

## Communication

Service communicate based on [JSON:API](https://jsonapi.org/) standard.

- For success response (`200 OK` status code):

```js
{
  data: /* action's returned */
}
```

- For error response (the status code is the first error status code):

```js
{
  errors: [ /* error list */
    {
      status: /* the HTTP status code, should be string */,
      code: /* application code, should be string */,
      title: /* a short, human-readable summary of the problem */,
      detail: /* a human-readable explanation specific to this occurrence of the problem */,
      source: {
        pointer: /* a JSON Pointer [RFC6901] to the associated entity in the request document */
          '/data/attributes/title',
      }
    }
  ]
}
```

But in local service, it should data or errors exception only.

## Error Handle

Each service using their errors with share error handle in `@rugo-vn/service`.

Example:

```js
import { RugoException } from '@rugo-vn/service';

class Forbidden extends RugoException {
  constructor(message, code){
    super(message);
    this.status = '304';
    this.code = code;
    this.source = { pointer: '' };
  }
}

throw new Forbidden('You do not have permission', '0001');
```