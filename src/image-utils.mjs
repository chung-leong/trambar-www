function transformImage(url, filters, srcFormat, dstFormat) {
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
        return `${url}/${modifiers.join('+')}.${dstFormat || srcFormat}`;
    } else {
        return url;
    }
}

export {
    transformImage,
};
