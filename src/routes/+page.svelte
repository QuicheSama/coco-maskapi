
<script lang="ts">
    import { encode, decode } from '$lib';
    import { rleFromString } from '$lib/mask';
    let outputCanvas: HTMLCanvasElement;
    let outputCanvasContext: CanvasRenderingContext2D | null;

    // const data = decode('_PX9330cc07O2N1j\\ODhb0=U]OEkb0;T]OFlb0:T]OFlb0:R]OHnb0d02N1O2N2N2M201O1O000006J2N001OEh\\OMYc03l\\OGUc08:0c\\OFTc09m\\OIPc08o\\OIPc09n\\OHQc0d00O1O0012N0O12\\Oi\\O031Vc0KV]O0[j:', (filled: boolean) => filled ? [255, 255, 255, 255] : [0, 0, 0, 255])
    // console.log(data);
    console.log(rleFromString('_PX9330cc07O2N1j\\ODhb0=U]OEkb0;T]OFlb0:T]OFlb0:R]OHnb0d02N1O2N2N2M201O1O000006J2N001OEh\\OMYc03l\\OGUc08:0c\\OFTc09m\\OIPc08o\\OIPc09n\\OHQc0d00O1O0012N0O12\\Oi\\O031Vc0KV]O0[j:'))
    console.log(rleFromString('_PX9330cc07O2N1'))
    // $: outputCanvasContext = outputCanvas?.getContext('2d')
    // $: outputCanvasContext && 
    //     outputCanvasContext.putImageData(new ImageData(data, 529, 640), 0, 0);
</script>
<div class='container'>
    <canvas class='output' height={640} width={529} bind:this={outputCanvas}/>
</div>

<style>
    .container {
        display: flex;
    }
</style>
