---
title: Broker
description: Broker
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/service_

## Configuration

Broker is a service with default named `$broker`.

```js
const broker = createBroker(settings); 

await broker.start();
await broker.close();
```

The `settings` will be shared with other services in broker. But it have some system properties that marked with underscore prefix, these system settings will be excluded to other service's settings.

- `_port`: Port to mount broker to.
- `_services`: List service's location to run auto load.

## Methods

Broker contains methods as a normal service, but it also have:

**`createService`**

Create and add a service to the broker from the configuration.

```js
const service = broker.createService(serviceConfig);
```

**`loadServices`**

Load services from `settings._services`.

```js
await broker.loadServices();
```