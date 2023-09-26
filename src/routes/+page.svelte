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

<div class="container" class:success={reencoded === sampleRleString}>
    <div>
        <div><strong>decoded output</strong></div>
        <canvas class="output" height={640} width={529} bind:this={outputCanvas} />
    </div>
	<div class="text-container">
        <div class="text">
            <div><strong>encoded source</strong></div>
            <textarea readonly>{sampleRleString}</textarea>
        </div>
		<div class="text">
            <strong>re-encoded output</strong>
            <textarea readonly>{reencoded}</textarea>
        </div>
	</div>
    
</div>

<style>
	.text-container {
		display: flex;
		flex-direction: row;
        flex-grow: 1;
	}
    .text {
        display: flex;
        flex-direction: column;
        min-width: 25em;
        padding: 1em;
    }

    .output {
        position:relative;
    }

	textarea {
		width: 100%;
        height: 100%;
	}

    .container.success {
        background-color: #11ff55;
    }
	.container {
		display: flex;
		flex-direction: row;
		height: 100%;
		width: 100%;
        padding: 1em;
        background-color: red;
	}
</style>
