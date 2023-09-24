// place files you want to import through the `$lib` alias in this folder.

import { rleEncode, rleDecode, rleFromString, rleToString } from "./mask"

const encode = (imageData: Uint8ClampedArray, fillCheck: (pixelData: Uint8ClampedArray) => boolean, depth = 4) => {
    const rle = rleEncode(imageData, fillCheck, depth);
    return rleToString(rle);
}

const decode = (encodedString: string, makePixel: (filled: boolean) => Array<number>) => {
    const rle = rleFromString(encodedString);
    return rleDecode(rle, makePixel);
}

export { encode, decode };