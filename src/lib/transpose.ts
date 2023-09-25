// TODO: find a better way to do this (shape is vague, maybe just hard code `height` and `width?)
/**
 * [height, width]
 */
type Shape = [number, number];
const transpose = (imageData: Uint8ClampedArray, currentShape: Shape) => {
	const transposedData = new Uint8ClampedArray(imageData.length);

	let destIndex = 0;
	for (let x = 0; x < currentShape[1]; x++) {
		for (let y = 0; y < currentShape[0]; y++) {
			const srcIndex = (y * currentShape[1] + x) * 4;
			transposedData[destIndex] = imageData[srcIndex]; // R
			transposedData[destIndex + 1] = imageData[srcIndex + 1]; // G
			transposedData[destIndex + 2] = imageData[srcIndex + 2]; // B
			transposedData[destIndex + 3] = imageData[srcIndex + 3]; // A
			destIndex += 4;
		}
	}

	return transposedData;
};

export { transpose, type Shape };
