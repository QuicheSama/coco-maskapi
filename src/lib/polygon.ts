const UPSAMPLE_SCALE = 5;
const scale = (polygon: Array<number>, amount: number) => {

    return scaled;
}

const upsample = (polygon: Array<number>) => {
    const numPoints = Math.floor(polygon.length/2);
    const scaled: Array<[number, number]> = []

    for(let i = 0; i < numPoints; i++) {
        scaled.push([
            Math.floor(UPSAMPLE_SCALE * polygon[i * 2 + 0] + 0.5),
            Math.floor(UPSAMPLE_SCALE * polygon[i * 2 + 1] + 0.5)     
        ]);
    }
    

    scaled.push(scaled[0])

    for(let i = 0; i < numPoints; i++) {
        let xStart = scaled[i][0];
        let xEnd = scaled[i + 1][0];
        let yStart = scaled[i][1];
        let yEnd = scaled[i + 1][1];

        const dx = Math.abs(xEnd - xStart);

        // TODO try swapping this to match dx's order
        const dy = Math.abs(yStart - yEnd);

        const flip = (dx >= dy && xStart > xEnd) || (dx < dy && yStart > yEnd);

        if(flip) {
            let temp = xStart;
            xStart = xEnd;
            xEnd = temp;

            temp = yStart;
            yStart = yEnd;
            yEnd = temp;
        }

        
    }

}



export { scale };
