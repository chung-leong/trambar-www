function deriveImageProps(original, options) {
    const { imageWidth, imageHeight } = options;
    const { imageFormat, imageFilters, imageBaseURL } = options;
    const { devicePixelRatio } = options;
    const resized = adjustImageDimensions(original, { width: imageWidth, height: imageHeight });
    const source = adjustImageDensity(resized, devicePixelRatio || 1, original);

    const dimFilters = {};
    let origWidth = original.width;
    let origHeight = original.height;
    if (resized.crop) {
        dimFilters.crop = resized.crop;
        origWidth = resized.crop.width;
        origHeight = resized.crop.height;
    }
    if (origWidth !== source.width || origHeight !== source.height) {
        dimFilters.resize = { width: source.width, height: source.height };
    }
    const filters = { ...dimFilters, ...options.imageFilters };
    let url = applyImageFilters(original.url, filters, original.format, imageFormat);
    if (imageBaseURL) {
        const sep = imageBaseURL.endsWith('/') ? '' : '/';
        url = imageBaseURL + sep + url;
    }
    return {
        src: url,
        width: source.width,
        height: source.height,
        style: {
            width: resized.width,
            height: resized.height,
        }
    };
}

function applyImageFilters(url, filters, srcFormat, dstFormat) {
    const modifiers = [];
    for (let [ n, v ] of Object.entries(filters)) {
        let m = '';
        switch (n) {
            case 'background':
                m = `ba${v.r}-${v.g}-${v.b}-${v.a}`;
                break;
            case 'blur':
                if (v) {
                    if (typeof(v) === 'number') {
                        m = `bl${v}`;
                    } else {
                        m = `bl`;
                    }
                }
                break;
            case 'crop':
                m = `cr${v.left}-${v.top}-${v.width}-${v.height}`;
                break;
            case 'extract':
                m = `ex${v}`;
                break;
            case 'flatten':
                if (v) {
                    m = `fla`;
                }
                break;
            case 'flip':
                if (v) {
                    m = `fli`;
                }
                break;
            case 'flop':
                if (v) {
                    m = `flo`;
                }
                break;
            case 'gamma':
                m = `ga${v}`;
                break;
            case 'grayscale':
                if (v) {
                    m = `gr`;
                }
                break;
            case 'negate':
                if (v) {
                    m = `ne`;
                }
                break;
            case 'normalize':
                if (v) {
                    m = `no`;
                }
                break;
            case 'lossless':
                if (v) {
                    m = `lo`;
                }
                break;
            case 'quality':
                m = `q${v}`;
                break;
            case 'rotate':
                m = `ro${v}`;
                break;
            case 'resize':
                m = `re${v.width}-${v.height}`;
                break;
            case 'sharpen':
                if (v) {
                    m = `sh`;
                }
                break;
            case 'trim':
                if (v) {
                    m = `tr`;
                }
                break;
        }
        if (m) {
            modifiers.push(m);
        }
    }
    if (modifiers.length > 0 || (dstFormat && srcFormat !== dstFormat)) {
        let format = srcFormat;
        if (dstFormat && srcFormat !== 'svg') {
            format = dstFormat;
        }
        return `${url}/${modifiers.join('+')}.${format}`;
    } else {
        return url;
    }
}

function adjustImageDimensions(original, desired) {
    const aspectRatio = original.width / original.height;
    let width, height, crop;
    if (desired.width && desired.height) {
        const desiredAspectRatio = desired.width / desired.height;
        if (desiredAspectRatio !== aspectRatio) {
            // need to crop image
            crop = {};
            if (desiredAspectRatio > aspectRatio) {
                // wider than actual image--crop top and bottom
                crop.width = original.width;
                crop.height = Math.round(original.width / desiredAspectRatio);
                crop.left = 0;
                crop.top = Math.round((original.height - crop.height) / 2);
            } else {
                crop.width = Math.round(original.height * desiredAspectRatio);
                crop.height = original.height;
                crop.left = Math.round((original.width - crop.width) / 2);
                crop.top = 0;
            }
        }
        width = desired.width;
        height = desired.height;
    } else if (desired.width) {
        width = desired.width;
        height = Math.round(desired.width / aspectRatio);
    } else if (desired.height) {
        width = Math.round(desired.height * aspectRatio);
        height = desired.height;
    } else {
        width = original.width;
        height = original.height;
    }
    return { width, height, crop };
}

function adjustImageDensity(visual, devicePixelRatio, limit) {
    const pixelRatioLimit = Math.min(limit.width / visual.width, limit.height / visual.height);
    const pixelRatio = Math.min(devicePixelRatio, pixelRatioLimit);
    const width = Math.round(visual.width * pixelRatio);
    const height = Math.round(visual.height * pixelRatio);
    return { width, height };
}

export {
    deriveImageProps,
    applyImageFilters,
    adjustImageDimensions,
    adjustImageDensity,
};
