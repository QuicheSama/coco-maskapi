import { stride } from './stride';
/**
 *  image's [height, width]
 */
type ImageDimensions = [number, number];

const rleEncode = (
	imageData: Uint8ClampedArray,
	fillCheck: (pixelData: Uint8ClampedArray) => boolean,
	depth = 4
) => {
	const counts: Array<number> = [0];
	stride(imageData, depth)
		.map((pixelData) => fillCheck(pixelData))
		.forEach((_, idx, mask) => {
			if (idx === 0 && !mask[idx]) {
				counts[counts.length - 1] += 1;
				return;
			}
			if (mask[idx - 1] === mask[idx]) {
				counts[counts.length - 1] += 1;
			} else {
				counts.push(1);
			}
		});

	return counts;
};

const rleDecode = (rle: Array<number>, makePixel: (filled: boolean) => Array<number>) => {
	const result: Array<number> = [];
	let filled = false;

	for (const count of rle) {
		for (let idx = 0; idx < count; idx++) {
			const pixel = makePixel(filled);
			result.push(...pixel);
		}
		filled = !filled;
	}
	return new Uint8ClampedArray(result);
};

const rleToString = (rle: Array<number>) => {
	let result = '';
	for (let idx = 0; idx < rle.length; idx++) {
		let count = rle[idx];
		let more = true;

		while (more) {
			let charCode = count & 0x1f;
			count >>= 5;

			more = charCode & 0x10 ? count !== -1 : count !== 0;

			if (more) charCode |= 0x20;
			result += String.fromCharCode(charCode + 48);
		}
	}

	return result;
};

const rleFromString = (encodedString: string) => {
	const characterCodes = encodedString.split('').map((char) => char.charCodeAt(0));

	let codePointer = 0;
	let ith = 0;
	let count = 0;
	let more = 0;

	const counts: Array<number> = [];

	while (characterCodes[codePointer]) {
		count = 0;
		ith = 0;
		more = 1;

		while (more) {
			const char = characterCodes[codePointer] - 48;
			count |= (char & 0x1f) << (5 * ith);
			more = char & 0x20;
			codePointer++;
			ith++;
			if (!more && char & 0x10) count |= -1 << (5 * ith);
		}

		if (counts.length > 2) {
			count += counts[counts.length - 2];
		}
		counts.push(count);
	}

	return counts;
};

export { rleEncode, rleDecode, rleToString, rleFromString };
export type { ImageDimensions };
