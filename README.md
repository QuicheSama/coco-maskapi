# coco-maskapi

A TypeScript port of Coco API's `maskApi.c` ([reference](https://github.com/cocodataset/cocoapi/blob/8c9bcc3cf640524c4c20a9c40e89cb6a2f2fa0e9/common/maskApi.c)).

## Context

Coco API uses a modified version of [Run Length Encoding (RLE)](https://en.wikipedia.org/wiki/Run-length_encoding) to efficiently store [image masks](https://en.wikipedia.org/wiki/Photomask). RLE data is further compressed via a modified version of [LEB128](https://en.wikipedia.org/wiki/LEB128) (which could likely be named `LEB32`).

`coco-maskapi` aims to bring this flavor of mask compression/encoding to web browsers, favoring Canvas [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) as the data source and target.

## Supported Functions

| Function      | Status      |
| ------------- | ----------- |
| `rleEncode`   | 🧑‍🏭 WIP      |
| `rleDecode`   | 🧑‍🏭 WIP      |
| `rleMerge`    | 🗒️ TODO     |
| `rleArea`     | 🗒️ TODO     |
| `rleNMS`      | 🗒️ TODO (?) |
| `bbIou`       | 🗒️ TODO     |
| `bbNms`       | 🗒️ TODO (?) |
| `rleToBbox`   | 🗒️ TODO     |
| `rleFrBbox`   | 🗒️ TODO     |
| `uintCompare` | 🗒️ TODO     |
| `rleFrPoly`   | 🗒️ TODO     |
| `rleToString` | 🧑‍🏭 WIP      |
| `rleFrString` | 🧑‍🏭 WIP      |

## Development

```bash
pnpm install
pnpm dev
```

## Endpoints

- `/`, base example
- `/worst`, worst case experimentation
