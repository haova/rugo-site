---
title: Driver
description: Driver
layout: ../../layouts/MainLayout.astro
---

_@rugo-vn/driver_

## Concept

- This module is a service created by `@rugo-vn/service`.
- An idea is using common action to handle assets (database, filesystem,...)
- An unit is using in all driver service called `doc`.

## Services

There is many drivers which provide handler to specific system:

- `driver.mongo` with MongoDB.
- `driver.mem` with LowDB.
- `driver.fs` with File System.

## Settings

`service.settings.driver.[name]`

Ex: `service.settings.driver.mongo`.

- `mongo` should be a connection uri.
- `mem` should be a directory path. (no validation)
- `fs` should be a directory path. (no validation)

## Schema

Service can use schema for validation. Following [JSON Schema](https://json-schema.org/) with additions in the root:

- `_name` specific collection's name (`mongo`), stored file (`mem`) or sub-directory to storing file (`fs`).
- `_index` (type: `['string']`) specify index field (`mongo` only).
- `_search` (type: `['string']`) specify full-text search field (`mongo` only).
- `_unique` (type: `['string']`) specify unique field (`mongo` only).

```js
{
  _name: 'collectionName',
  _searches: ['fieldNameA'],
  _indexes: ['fieldNameB'],
  _uniques: ['fieldNameC'],
}
```

_Note: All system fields (with underscore prefix) will be removed when passed to deeper step._

## Actions

These services shared same action structure and have `schema` argument as required, the returned below will be wrapped by response format in the next section.

### `find`

Arguments:

- `query` (type: `object`) query to filter doc.
- `limit` (type: `number`) limit document returned.
- `sort` (type: `object`) sort by field. (Ex: `sort: { 'nameAsc': 1, 'nameDesc': -1 }`).
- `skip` (type: `number`) skip amount of doc.

Return: 

- `[doc]` array of doc.

### `count`

Arguments:

- `query` (type: `object`) query to filter doc.

Return: 

- `number` amount of doc filtered by query.

### `create`

Arguments:

- `data` (type: `object`) data to create new doc.

Return: 

- `doc` created doc.

### `update`

Arguments:

- `query` (type: `object`) query to filter doc.
- `set` (type: `object`) set value to some field.
- `unset` (type: `object`) unset value from some field.
- `inc` (type: `object`) increase value from some field.

Return: 

- `number` amount of doc updated.

### `remove`

Arguments:

- `query` (type: `object`) query to filter doc.

Return: 

- `number` amount of doc removed.
