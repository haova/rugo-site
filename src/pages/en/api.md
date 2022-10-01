---
title: Api
description: Api
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/api_

## Concept

- This module is a service created by `@rugo-vn/service` and take the route structure from `@rugo-vn/server` as arguments.
- Using to mapping `@rugo-vn/model` (model mapping) to api with `this` call.
- Using to mapping `@rugo-vn/auth` (auth mapping) to api with `this` call.
- High level permission manage.

## Arguments

For model mapping:

- `schemas`

For auth mapping: 

- `auth` Auth object for authorization.
- `authSchema` user's schema for authentication.

## Auth mapping

### Origins

- `POST /api/login` -> `auth.login`:
  + `form` -> `data`
- `POST /api/register` -> `auth.register`:
  + `form` -> `data`

### `GET /api/about-me`

- This action will take args for `gate`.
- It will call gate to get `user` and return the user info without `password` and `apiKey`.

### `POST /api/change-password`

- This action will take args for `gate`.
- It will call gate to get `user` then change password if it match with current password.

## Model Mapping

Preface:

- Before each actions, it shoulds check `_acl` field in schema to determine the action is public or not. If it's public, call `model` action directly.
- If not, call `auth.gate` with following args:
  + `auth`: Auth object, with `action` name, `model` name and `id` if existed. (be shared)
  + `authSchema`: User schema for authorization. (be shared from parent)
  + `apiKey`: Api key from headers, if existed. (parsed from hook)
  + `token`: JWT from headers, if existed. (parsed from hook)
- `auth.gate` will throw exceptions if failed or a `user` object when it successes.

Actions:

- `GET /api/:model` -> `model.find`
  + `query.query` -> `query`
  + `query.limit` -> `limit`
  + `query.skip` -> `skip`
  + `query.sort` -> `sort`
  + `query.page` -> `page`
- `GET /api/:model/:id` -> `model.get`
  + `params.id` -> `id`
- `POST /api/:model` -> `model.create`
  + `form` -> `data`
- `PATCH /api/:model/:id` -> `model.update`
  + `id` -> `id`
  + `form.set` -> `set`
  + `form.unset` -> `unset`
  + `form.inc` -> `inc`
- `DELETE /api/:model/:id` -> `model.remove`
  + `id` -> `id`
