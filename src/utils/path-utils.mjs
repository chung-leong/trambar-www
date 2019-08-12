function parsePath(path, max) {
    if (!(path instanceof Array)) {
        path = (path + '').split('.');
    }
    if (path.length > max) {
        throw new Error(`Path ${path.join('.')} contains too many names`);
    }
    return path;
}

export {
    parsePath,
}
