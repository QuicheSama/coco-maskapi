// TODO: find a better way to do this (shape is vague, maybe just hard code `height` and `width?)
const transpose = (data: Uint8ClampedArray, shape: Array<number>) => {
    const expectedTotal = shape.reduce((acc, d) => acc * d, 1)
    if(data.length !== expectedTotal) {
        throw new Error(`data.length ${data.length} does not meet expected total (${expectedTotal})`)
    }

    const transposedData = new Uint8ClampedArray(data.length);

    let destIndex = 0;
    for (let x = 0; x < shape[1]; x++) {
        for (let y = 0; y < shape[0]; y++) {
            const srcIndex = (y * shape[1] + x) * 4;
            transposedData[destIndex] = data[srcIndex];       // R
            transposedData[destIndex + 1] = data[srcIndex + 1]; // G
            transposedData[destIndex + 2] = data[srcIndex + 2]; // B
            transposedData[destIndex + 3] = data[srcIndex + 3]; // A
            destIndex += 4;
        }
    }

    return transposedData;
}

export { transpose };