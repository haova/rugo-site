---
title: Platform
description: Platform
layout: ../../layouts/MainLayout.astro
---

![](/images/dependencies.png) _Service dependencies and status_

## Rugo Service

Repo: `@rugo-vn/service`

There are a lot of stuffs in this repository:

- [**Service**](/en/service) is an unit, a base for other packages.
- [**Broker**](/en/broker) is a special service, based on [**service**](/en/service), using for prepare enviroment for the application and start other services, which were registered in the setting file `rugo.config.js`.
- Beside that, we also have some [definitions](/en/definition) for other repositories using with.
- To know more about how service works, you can visit the [concept](/en/concept) page.

**How to use**

You can use Rugo Service for your application.

```bash
npm i @rugo-vn/service -S
```

And start your application based on Rugo Service by command:

```bash
node node_modules/@rugo-vn/service/src/start.js
```

You can added the command into package's script.

```js
// package.json
{
  "scripts": {
    "start": 'node node_modules/@rugo-vn/service/src/start.js',
    "dev": 'nodemon node_modules/@rugo-vn/service/src/start.js'
  }
}
```

and run with:

```bash
npm run start

# or 

npm run dev
```

## Independent Services

Services can running with Rugo Service (`@rugo-vn/service`) only, not depends on (or not required) any others.

- [**Rugo Driver**](/en/driver) `@rugo-vn/driver`: Communicate with system and other programs like databases, web servers,...]
- [**Rugo Server**](/en/server) `@rugo-vn/server`: Create a server to communicate with the world. It can call other service's actions but not required them to working well.

## Dependent Services

There are services that require other services to run correctly.

- [**Rugo Model**](/en/model) `@rugo-vn/model`: Wrap drivers in Rugo Driver for selection, providing more actions to handle data, making it easy to use, and more.
