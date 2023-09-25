<script lang="ts">
	import { encode, decode } from '$lib';
	import type { Shape } from '$lib/transpose';
	let outputCanvas: HTMLCanvasElement;
	let outputCanvasContext: CanvasRenderingContext2D | null;

	// Sample taken from https://stackoverflow.com/questions/68838058/convert-coco-run-length-encoding-rle-back-to-segmentation
	const sampleRleString =
		'_PX9330cc07O2N1j\\ODhb0=U]OEkb0;T]OFlb0:T]OFlb0:R]OHnb0d02N1O2N2N2M201O1O000006J2N001OEh\\OMYc03l\\OGUc08:0c\\OFTc09m\\OIPc08o\\OIPc09n\\OHQc0d00O1O0012N0O12\\Oi\\O031Vc0KV]O0[j:';

	const sampleDimensions: Shape = [640, 529];
	const data = decode(sampleRleString, sampleDimensions, (filled: boolean) =>
		filled ? [255, 255, 255, 255] : [0, 0, 0, 255]
	);

	let mask: ImageData | null = null;
	let reencoded: string = '';

	$: outputCanvasContext = outputCanvas?.getContext('2d');
	$: mask = outputCanvasContext
		? new ImageData(data, sampleDimensions[1], sampleDimensions[0])
		: null;
	$: mask && outputCanvasContext && outputCanvasContext.putImageData(mask, 0, 0);
	$: reencoded = mask
		? encode(mask.data, sampleDimensions, (pixelData: Uint8ClampedArray) => pixelData[0] > 0)
		: '';
	$: console.log(`Re-encoded matches? ${reencoded === sampleRleString}`, reencoded);
</script>

<div class="container">
	<div class="text-container" class:success={reencoded === sampleRleString}>
		<textarea readonly>{sampleRleString}</textarea>
		<textarea readonly>{reencoded}</textarea>
	</div>
	<canvas class="output" height={1000} width={1000} bind:this={outputCanvas} />
</div>

<style>
	.text-container {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		border: 1rem solid red;
	}
	textarea {
		width: 100%;
	}
	.success {
		border: 1rem solid #11dd10;
	}
	.container {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
	}
</style>
