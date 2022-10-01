---
title: Auth
description: Auth
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/auth_

## Concept

- This module is a service created by `@rugo-vn/service`, take the route structure from `@rugo-vn/server` as arguments and get data from `@rugo-vn/model`.


## Settings

```js
{
  auth: /* a secret string */,
}
```

## Schema

It's using `authSchema` which some following fields:

```js
{
  password: /* sha1 password hashed */,
  apiKey: /* direct key for auth from api, unique */,
  perms: [
    /* perm list */
  ]
}
```

You can take that part of schema in `@rugo-vn/auth/src/schema.js` and merge it with your origin schema.

## Permission

For validation permission, it makes sure `auth` object match with at lease one perm in `perms` list of user.

`perm` format: 

```js
{
  [key]: value,
}
```

- To matching, `auth` and `perm` should deep equal.
- You can using only underscore `_` value to match any value in `auth` object.

## Actions

For each actions, it should have some args:

- `authSchema` user's schema for authentication (required).

### `login`

Arguments:

- `{object} data`

Return: 

- `{string}` token of logging user.

Processes:

- `data` contains your identity and `password` field. `password` will be excluded from `data`, the remain part will send to `@rugo-vn/model` with `authSchema` to get results.
- Then, password will be check in each results.

### `register`

Arguments:

- `{object} data`

Return:

- `{boolean}` always `true`, if have any problem, throwing error.

Processes:

- Exclude all default auth schema field (`password`, `apiKey`, `perms`) from `data`.
- Hased `password`, generate `apiKey` to `data`.
- Then, call `model.create`.

### `gate`

Parse `token` or `apiKey` and check permission.

Arguments:

- `{string} token`
- `{string} apiKey`
- `{object} auth` Auth object for authorization (optional).

Return:

- `{object}` user object if valid.