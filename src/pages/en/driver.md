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

- `mongo` should be a connection uri. (full validation)
- `mem` should be a directory path. (simple validation)
- `fs` should be a directory path. (simple validation)

## Schema

Service can use schema for validation. Following [JSON Schema](https://json-schema.org/) with additions in the root:

- `_name` specific collection's name (`mongo`), stored file (`mem`) or sub-directory to storing file (`fs`).
- `_index` (type: `['string']`) specify index field (`mongo` only).
- `_search` (type: `['string']`) specify full-text search field (`mongo` only).
- `_unique` (type: `['string']`) specify unique field (`mongo` and `mem`).

```js
{
  _name: 'collectionName',
  _searches: ['fieldNameA'],
  _indexes: ['fieldNameB'],
  _uniques: ['fieldNameC'],
}
```

_Note:_

- All system fields (with underscore prefix) will be removed when passed to deeper step.
- `fs` driver should have `_name` only.

**`fs` driver doc format**

```js
{
  name: /* file/dir name */,
  mime: /* mine of file or 'inode/directory' */,
  parent: /* parent directory id */,
  size: /* file size or 0 if directory */,
  updatedAt: /* mtime */
}
```

## Actions

These services shared same action structure and have `schema` argument as required, the returned below will be wrapped by response format in the next section.

### `find`

Arguments:

- `query` (type: `object`) query to filter doc.
- `limit` (type: `number`) limit document returned.
- `sort` (type: `object`) sort by field. (Ex: `sort: { 'nameAsc': 1, 'nameDesc': -1 }`).
- `skip` (type: `number`) skip amount of doc.

Return: 

- `{[doc]}` array of doc.

_Notes:_

- `sort` in `fs` driver sorts in entire directory only (same parent).

### `count`

Arguments:

- `query` (type: `object`) query to filter doc.

Return: 

- `{number}` amount of doc filtered by query.

### `create`

Arguments:

- `data` (type: `object`) data to create new doc.

Return: 

- `{doc}` created doc.

_Notes:_

- In `fs` driver, you can create a doc with `name` and `parent` property only.


### `update`

Arguments:

- `query` (type: `object`) query to filter doc.
- `set` (type: `object`) set value to some field.
- `unset` (type: `object`) unset value from some field.
- `inc` (type: `object`) increase value from some field.

Return: 

- `{number}` amount of doc updated.

_Notes:_

- In `fs` driver, you can update a doc (only one doc specified by `_id` property) with `name` and `parent` property with `set` method only. 

### `remove`

Arguments:

- `query` (type: `object`) query to filter doc.

Return: 

- `{number}` amount of doc removed.

_Notes:_

- In `fs` driver, you can remove a doc (only one doc specified by `_id` property).

## Fs Driver

### FsId

This is a special encoded identity for `fs` driver to determine a file or a directory.

```js
id = FsId('<your_encoded_id>'); /* returned FsId object */

/* from path */

id = FsId.fromPath('<your_origin_path>'); /* path that excluded root */

/* to path */
filePath = id.toPath();
```

### Upload/Download

For `@rugo-vn/service` `v2.0.1`, you can put and get file between two service. Therefore, `fs` driver also put and get file, called `upload` and `download` action.

```js
/* upload */
await this.put(`driver.fs.upload`, {
  id: /* FsId of file */,
  collection: /* Colletion name to store the file */,
  data: /* data of file */,
});

/* and download */
await this.get(`driver.fs.download`, {
  id: /* FsId of file */,
  collection: /* Colletion name to store the file */,
  hash: /* hash of file, if hash matched, return true (for caching) */, 
});
```