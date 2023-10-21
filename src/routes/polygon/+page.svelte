<script lang="ts">
	import { rleFromPoly } from '$lib/polygon';

	let outputCanvas: HTMLCanvasElement;
	let outputCanvasContext: CanvasRenderingContext2D | null;
	let height = 5;
	let width = 5;
	const depth = 4;
	let mask: ImageData | null;
	let decodedMask: ImageData | null;
	let filled = false;
	let encoded = '';
	let decoded = new Uint8ClampedArray(0);

	$: outputCanvasContext = outputCanvas?.getContext('2d');
	$: console.log('banana', rleFromPoly([2, 3, 2, 7, 6, 7, 6, 3]));

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
