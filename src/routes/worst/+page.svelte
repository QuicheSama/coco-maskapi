<script lang="ts">
	import { encode, decode } from '$lib';

	let outputCanvas: HTMLCanvasElement;
	let outputCanvasContext: CanvasRenderingContext2D | null;
	let height = 101;
	let width = 101;
	const depth = 4;
	let mask: ImageData | null;
	let decodedMask: ImageData | null;
	let filled = true;
	let encoded = '';
	let decoded = new Uint8ClampedArray(0);
	const checkerboard = (_: number, i: number) => {
		if (i % 4 === 0) {
			filled = !filled;
			return filled ? 255 : 0;
		}
		if (i % 4 === 1) {
			return filled ? 255 : 0;
		}
		if (i % 4 === 2) {
			return filled ? 255 : 0;
		}

		return 255;
	};

	$: outputCanvasContext = outputCanvas?.getContext('2d');
	$: mask = outputCanvasContext
		? new ImageData(new Uint8ClampedArray(width * height * depth).map(checkerboard), width)
		: null;
	$: encoded = mask
		? encode(mask.data, [height, width], (pixelData: Uint8ClampedArray) => pixelData[0] > 0)
		: '';
	$: decoded = decode(encoded, [height, width], (filled) =>
		filled ? [255, 255, 255, 255] : [0, 0, 0, 255]
	);

	$: decodedMask = outputCanvasContext ? new ImageData(decoded, width) : null;
	$: if (decodedMask && outputCanvasContext) {
		outputCanvasContext.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
		outputCanvasContext.putImageData(decodedMask, 0, 0);
	}
</script>

<div class="space">
	<div>
		<div class="output">
			<strong>height:</strong>
			<input type="number" class="height-input" bind:value={height} />
		</div>
		<div class="output">
			<strong>width:</strong>
			<input type="number" class="width-input" bind:value={width} />
		</div>
		<div class="output">
			<div><strong>pixels:</strong> {width * height}</div>
		</div>
		<div class="output">
			<div><strong>length:</strong> {encoded.length}</div>
		</div>
	</div>
	<div>
		<div class="output">
			<canvas width={1000} height={1000} bind:this={outputCanvas} />
		</div>
	</div>
</div>

<style>
	.space {
		display: flex;
	}
	.output {
		padding: 1rem;
	}
	canvas {
		image-rendering: pixelated;
	}
</style>
