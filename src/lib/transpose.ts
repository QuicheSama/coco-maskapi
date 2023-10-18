type Shape = [height: number, width: number];

const transpose = (imageData: Uint8ClampedArray, currentShape: Shape, depth = 4) => {
	const transposed = new Uint8ClampedArray(imageData.length);

	let destIndex = 0;
	for (let x = 0; x < currentShape[1]; x++) {
		for (let y = 0; y < currentShape[0]; y++) {
			const srcIndex = (y * currentShape[1] + x) * depth;
			for (let i = 0; i < depth; i++) {
				transposed[destIndex + i] = imageData[srcIndex + i]; // R
			}
			destIndex += 4;
		}
	}

	return transposed;
};

export { transpose, type Shape };
