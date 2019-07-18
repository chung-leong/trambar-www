function parsePath(path, max) {
    if (!(path instanceof Array)) {
        path = (path + '').split('.');
    }
    if (path.length > max) {
        throw new Error(`Path ${path.join('.')} contains too many names`);
    }
    return path;
}

function chooseLanguageVersion(objects, lang) {
    const [ reqLC, reqCC ] = (lang) ? lang.toLowerCase().split('-') : [];
    const list = [];
    const existing = {};
    for (let object of objects) {
        const score = getLanguageMatch(object, reqLC, reqCC);
        const previous = existing[object.name];
        if (!previous) {
            existing[object.name] = { index: list.length, score };
            list.push(object);
        } else if (previous.score < score) {
            list[previous.index] = object;
            previous.score = score;
        }
    }
    return list;
}

const localeRegExp = /^\w{2}(\-\w{2})?$/;

function getLanguageMatch(object, reqLC, reqCC) {
    let highest = 0;
    if (reqLC && object.flags instanceof Array) {
        for (let flag of object.flags) {
            if (localeRegExp.test(flag)) {
                const [ lc, cc ] = flag.toLowerCase().split('-');
                if (lc === reqLC) {
                    let score = 50;
                    if (cc === reqCC) {
                        score = 100;
                    }
                    if (score > highest) {
                        highest = score;
                    }
                }
            }
        }
    }
    return highest;
}

export {
    parsePath,
    chooseLanguageVersion,
};
