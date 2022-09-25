---
title: Definition
description: Rugo definition
layout: ../../layouts/MainLayout.astro
---


## Name and Variable

- Using camelCase with common name (Ex: `model`, `createdAt`, `findAndReplace`).
- Adding underscore as prefix with config/hidden/comment name (Ex: `_name`, `_type`, `_relatedBy`).
- Using square brackets `[` and `]`, with named/property/param name (Ex: `[id]`, `[name]`).
- Using kebab-case with slug, file name, or long identify message (Ex: `this-is-a-slug`, `file-name`).

## Broker

- An instance prepare environment for running services.
- It can connect to other brokers by provide connection string.
- It can open for other brokers connect to by profile port number.
- It's a service.

## Service

- An unit of the platform, which contains handle operations.
- An service run inside a broker.
- It can call other broker's services or foreign services which defined in broker's configuration.

## Method

- Function run inside service.
- It was declared in the service.
- It can be called inside and outside the service.
- Also has some system's method:
  + `start`: Start a service, call `started` method.
  + `close`: Close a service, call `closed` method.

## Action

- Function handle call from broker or other service.
- It can be chained with shared arguments.
- It cannot execute from anywhere but can be handled by call method provided by broker or chain action call.

## Hooks

- Functions run before or after the action.
- It can be string which mean the name of method.

## Event

- Each service has some event which is executed in specific time.
  + `started` when `start` method is run.
  + `closed` when `close` method is run.

## Address

- Connection string to the specific action of service. 

## Arguments

- Arguments, which is passed to the action, should be an object can serialize to string.
- There are three type of argument:
  + Local argument: Can be access in local action.
  + Shared argument: Can be share between action chain.
  + Config argument: Should have underscore prefix, using for config call action.

## Scopes

- Scopes using for call any function in the services.
  + outside-callable: `start`, `close`, `call`, `settings` and methods registered in the service.
  + non-callable: actions - using call method in the service or call chain.
  + inside-callable: `settings` and methods registered in the service.
- Hooks is automatical execute when call action.