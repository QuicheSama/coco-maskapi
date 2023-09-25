const stride = <T extends Uint8ClampedArray>(array: T, strideLength: number) => {
	if (strideLength < 1) {
		throw new Error(`strideLength (${strideLength}) must be greater than 0.`);
	}

	if (array.length % strideLength !== 0) {
		throw new Error(
			`array.length (${array.length}) must be multiple of strideLength (${strideLength}).`
		);
	}

	const strided: Array<Uint8ClampedArray> = [];
	for (let idx = 0; idx < array.length; idx += strideLength) {
		strided.push(array.slice(idx, idx + strideLength));
	}

	return strided;
};

export { stride };
