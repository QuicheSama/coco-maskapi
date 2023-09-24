import { describe, it, expect } from 'vitest';
import { rleEncode, rleDecode, rleFromString, rleToString } from '$lib/mask';

describe('mask', () => {
	describe('rleEncode', () => {
		describe('defaults to depth = 4', () => {
			it('[0, 0, 0, 0]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 0, 0, 0]), (x: Uint8ClampedArray) => !!x[0])
				).toEqual([1]);
			});

			it('[1, 1, 1, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 1, 1, 1]), (x: Uint8ClampedArray) => !!x[0])
				).toEqual([0, 1]);
			});

			it('[0, 0, 0, 0, 0, 0, 0, 0]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 0]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([2]);
			});

			it('[0, 0, 0, 0, 1, 1, 1, 1]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 1, 1, 1, 1]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([1, 1]);
			});

			it('[1, 1, 1, 1, 1, 1, 1, 1]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([1, 1, 1, 1, 1, 1, 1, 1]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([0, 2]);
			});

			it('[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([3]);
			});

			it('[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([2, 1]);
			});

			it('[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([1, 1, 1]);
			});

			it('[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]', () => {
				expect(
					rleEncode(
						new Uint8ClampedArray([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]),
						(x: Uint8ClampedArray) => !!x[0]
					)
				).toEqual([1, 2]);
			});
		});

		describe('handles depth = 1', () => {
			it('[0]', () => {
				expect(rleEncode(new Uint8ClampedArray([0]), (x: Uint8ClampedArray) => !!x[0], 1)).toEqual([
					1
				]);
			});

			it('[1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 0]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([2]);
			});

			it('[0, 0]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 0]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([2]);
			});

			it('[0, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([1, 1]);
			});

			it('[1, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([0, 2]);
			});

			it('[0, 0, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 0, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([2, 1]);
			});

			it('[0, 1, 0]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 1, 0]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([1, 1, 1]);
			});
			it('[0, 1, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([0, 1, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([1, 2]);
			});
			it('[1, 0, 0]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 0, 0]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([0, 1, 2]);
			});

			it('[1, 0, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 0, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([0, 1, 1, 1]);
			});

			it('[1, 1, 0]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 1, 0]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([0, 2, 1]);
			});

			it('[1, 1, 1]', () => {
				expect(
					rleEncode(new Uint8ClampedArray([1, 1, 1]), (x: Uint8ClampedArray) => !!x[0], 1)
				).toEqual([0, 3]);
			});
		});
	});

	describe('rleDecode', () => {
		it('[0]', () => {
			expect(
				rleDecode([0], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([]));
		});
		it('[1]', () => {
			expect(
				rleDecode([1], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([0]));
		});

		it('[0, 1]', () => {
			expect(
				rleDecode([0, 1], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([1]));
		});

		it('[1, 1]', () => {
			expect(
				rleDecode([1, 1], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([0, 1]));
		});

		it('[1, 1, 1]', () => {
			expect(
				rleDecode([1, 1, 1], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([0, 1, 0]));
		});

		it('[2, 2, 2]', () => {
			expect(
				rleDecode([2, 2, 2], (filled: boolean) => {
					return [filled ? 1 : 0];
				})
			).toEqual(new Uint8ClampedArray([0, 0, 1, 1, 0, 0]));
		});
	});

	describe('rleToString', () => {
		it('[1]', () => {
			expect(rleToString([1])).toEqual('1');
		});

		it('[31]', () => {
			expect(rleToString([31])).toEqual('o0');
		});

		it('[32]', () => {
			expect(rleToString([32])).toEqual('P1');
		});

		it('[63]', () => {
			expect(rleToString([63])).toEqual('o1');
		});

		it('[64]', () => {
			expect(rleToString([64])).toEqual('P2');
		});

		it('[127]', () => {
			expect(rleToString([127])).toEqual('o3');
		});

		it('[128]', () => {
			expect(rleToString([128])).toEqual('P4');
		});

		it('[256]', () => {
			expect(rleToString([256])).toEqual('P8');
		});

		it('[512]', () => {
			expect(rleToString([512])).toEqual('P`0');
		});

		it('[1024]', () => {
			expect(rleToString([1024])).toEqual('PP1');
		});

		it('[2048]', () => {
			expect(rleToString([2048])).toEqual('PP2');
		});

		it('[1, 1]', () => {
			expect(rleToString([1, 1])).toEqual('11');
		});

		it('[31, 1]', () => {
			expect(rleToString([31, 1])).toEqual('o01');
		});

		it('[31, 31]', () => {
			expect(rleToString([31, 31])).toEqual('o0o0');
		});

		it('[64, 31]', () => {
			expect(rleToString([64, 31])).toEqual('P2o0');
		});

		it('[64, 64]', () => {
			expect(rleToString([64, 64])).toEqual('P2P2');
		});

		it('[128, 128]', () => {
			expect(rleToString([128, 128])).toEqual('P4P4');
		});

		it('[128, 128, 128]', () => {
			expect(rleToString([128, 128, 128])).toEqual('P4P4P4');
		});

		it('[512, 512, 512]', () => {
			expect(rleToString([512, 512, 512])).toEqual('P`0P`0P`0');
		});
	});

	describe('rleFromString', () => {
		it('decodes PP1', () => {
			expect(rleFromString('PP1')).toEqual([1024]);
		});

		it('decodes P`0P`0P`0', () => {
			expect(rleFromString('P`0P`0P`0')).toEqual([512, 512, 512]);
		});
	});
});
