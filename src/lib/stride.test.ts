import { describe, it, expect } from 'vitest';
import { stride } from '$lib/stride';

describe('stride', () => {
	it('throws when array.length is not multiple of strideLength', () => {
		expect(() => stride(new Uint8ClampedArray([0]), 2)).toThrowError();
	});

	it('throws when strideLength is less than 0', () => {
		expect(() => stride(new Uint8ClampedArray([]), -3)).toThrowError();
	});

	it('throws when strideLength is less than 1', () => {
		expect(() => stride(new Uint8ClampedArray([]), 0)).toThrowError();
	});

	it('handles empty array', () => {
		expect(stride(new Uint8ClampedArray([]), 1)).toEqual([]);
	});

	it('handles length 2, stride 1', () => {
		expect(stride(new Uint8ClampedArray([1, 2]), 1)).toEqual([
			new Uint8ClampedArray([1]),
			new Uint8ClampedArray([2])
		]);
	});

	it('handles length 4, stride 2', () => {
		expect(stride(new Uint8ClampedArray([1, 2, 3, 4]), 2)).toEqual([
			new Uint8ClampedArray([1, 2]),
			new Uint8ClampedArray([3, 4])
		]);
	});

	it('handles length 6, stride 2', () => {
		expect(stride(new Uint8ClampedArray([1, 2, 3, 4, 5, 6]), 2)).toEqual([
			new Uint8ClampedArray([1, 2]),
			new Uint8ClampedArray([3, 4]),
			new Uint8ClampedArray([5, 6])
		]);
	});

	it('handles length 6, stride 3', () => {
		expect(stride(new Uint8ClampedArray([1, 2, 3, 4, 5, 6]), 3)).toEqual([
			new Uint8ClampedArray([1, 2, 3]),
			new Uint8ClampedArray([4, 5, 6])
		]);
	});
});
