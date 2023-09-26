// place files you want to import through the `$lib` alias in this folder.

import { rleEncode, rleDecode, rleFromString, rleToString } from './mask';
import { transpose } from './transpose';

import type { Shape } from '$lib/transpose';
const encode = (
	imageData: Uint8ClampedArray,
	[height, width]: Shape,
	fillCheck: (pixelData: Uint8ClampedArray) => boolean,
	depth = 4
) => {
	const rle = rleEncode(transpose(imageData, [height, width]), fillCheck, depth);
	return rleToString(rle);
};

const decode = (
	encodedString: string,
	[width, height]: Shape,
	makePixel: (filled: boolean) => Array<number>,
	depth = 4
) => {
	const rle = rleFromString(encodedString);
	return transpose(rleDecode(rle, makePixel), [height, width], depth);
};

export { encode, decode };
