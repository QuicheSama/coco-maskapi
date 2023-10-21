type Point = [x: number, y: number];

const unzipPairs = (xy: Array<number>): Point[] =>
	Array.from({ length: Math.floor(xy.length / 2) }, (_, i) => [xy[2 * i], xy[2 * i + 1]]);

const scalePointBy =
	(scale: number) =>
	(p: Point): Point =>
		[(p[0] + 0.5) * scale - 0.5, (p[1] + 0.5) * scale - 0.5];

const discreteLinearSample = (p1: Point, p2: Point) => {
	const dx = Math.abs(p2[0] - p1[0]);
	const dy = Math.abs(p2[1] - p1[1]);

	const longestAxisLength = Math.max(dx, dy);

	const samples: Point[] = [];
    console.log({p1, p2, dx, dy, longestAxisLength})

	for (let i = 0; i <= longestAxisLength; i++) {
		const x = p1[0] + (i * (p2[0] - p1[0])) / longestAxisLength;
		const y = p1[1] + (i * (p2[1] - p1[1])) / longestAxisLength;
		samples.push([Math.round(x), Math.round(y)]);
	}

	return samples;
};

const rleFromPoly = (xy: Array<number>) => {
	const points = unzipPairs(xy);
	points.push([points[0][0], points[0][1]]);

	points
		.map(scalePointBy(5))
		.flatMap((_, idx, points) =>
			idx < points.length - 1 ? discreteLinearSample(points[idx], points[idx + 1]) : []
		)
        .map(scalePointBy(1/5));

    return points;
    
};

export { rleFromPoly };
