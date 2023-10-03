typedef struct
{
    unsigned long h, w, m;
    unsigned int *cnts;
} RLE;

int uintCompare(const void *a, const void *b)
{
    unsigned int c = *((unsigned int *)a), d = *((unsigned int *)b);
    return c > d ? 1 : c < d ? -1
                             : 0;
}

void rleFrPoly(RLE *R, const double *xy, unsigned long k, unsigned long h, unsigned long w)
{
    /* upsample and get discrete points densely along entire boundary */
    unsigned long j, m = 0;
    double scale = 5;
    int *x, *y, *u, *v;
    unsigned int *a, *b;
    x = malloc(sizeof(int) * (k + 1));
    y = malloc(sizeof(int) * (k + 1));

    // REMARK: fill x
    for (j = 0; j < k; j++)
        x[j] = (int)(scale * xy[j * 2 + 0] + .5);
    x[k] = x[0];
    
    // REMARK: fill y
    for (j = 0; j < k; j++)
        y[j] = (int)(scale * xy[j * 2 + 1] + .5);
    y[k] = y[0];
    
    // REMARK: get length of longest axis between each point (including the source pixel)
    for (j = 0; j < k; j++)
        m += umax(abs(x[j] - x[j + 1]), abs(y[j] - y[j + 1])) + 1;
    u = malloc(sizeof(int) * m);
    v = malloc(sizeof(int) * m);
    m = 0;
    for (j = 0; j < k; j++)
    {
        int xStart = x[j], xEnd = x[j + 1], yStart = y[j], yEnd = y[j + 1], dx, dy, t, d;
        int flip;
        double s;
        dx = abs(xEnd - xStart);
        dy = abs(yStart - yEnd);
        flip = (dx >= dy && xStart > xEnd) || (dx < dy && yStart > yEnd);
        if (flip)
        {
            t = xStart;
            xStart = xEnd;
            xEnd = t;
            t = yStart;
            yStart = yEnd;
            yEnd = t;
        }
        s = dx >= dy ? (double)(yEnd - yStart) / dx : (double)(xEnd - xStart) / dy;
        if (dx >= dy)
            for (d = 0; d <= dx; d++)
            {
                t = flip ? dx - d : d;
                u[m] = t + xStart;
                v[m] = (int)(yStart + s * t + .5);
                m++;
            }
        else
            for (d = 0; d <= dy; d++)
            {
                t = flip ? dy - d : d;
                v[m] = t + yStart;
                u[m] = (int)(xStart + s * t + .5);
                m++;
            }
    }
    /* get points along y-boundary and downsample */
    free(x);
    free(y);
    k = m;
    m = 0;
    double xd, yd;
    x = malloc(sizeof(int) * k);
    y = malloc(sizeof(int) * k);
    for (j = 1; j < k; j++)
        if (u[j] != u[j - 1])
        {
            xd = (double)(u[j] < u[j - 1] ? u[j] : u[j] - 1);
            xd = (xd + .5) / scale - .5;
            if (floor(xd) != xd || xd < 0 || xd > w - 1)
                continue;
            yd = (double)(v[j] < v[j - 1] ? v[j] : v[j - 1]);
            yd = (yd + .5) / scale - .5;
            if (yd < 0)
                yd = 0;
            else if (yd > h)
                yd = h;
            yd = ceil(yd);
            x[m] = (int)xd;
            y[m] = (int)yd;
            m++;
        }
    /* compute rle encoding given y-boundary points */
    k = m;
    a = malloc(sizeof(unsigned int) * (k + 1));
    for (j = 0; j < k; j++)
        a[j] = (unsigned int)(x[j] * (int)(h) + y[j]);
    a[k++] = (unsigned int)(h * w);
    free(u);
    free(v);
    free(x);
    free(y);
    qsort(a, k, sizeof(unsigned int), uintCompare);
    unsigned int p = 0;
    for (j = 0; j < k; j++)
    {
        unsigned int t = a[j];
        a[j] -= p;
        p = t;
    }
    b = malloc(sizeof(unsigned int) * k);
    j = m = 0;
    b[m++] = a[j++];
    while (j < k)
        if (a[j] > 0)
            b[m++] = a[j++];
        else
        {
            j++;
            if (j < k)
                b[m - 1] += a[j++];
        }
    rleInit(R, h, w, m, b);
    free(a);
    free(b);
}