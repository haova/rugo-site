---
title: Concepts
description: Rugo definition
layout: ../../layouts/MainLayout.astro
---

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
  }
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
