function chooseLanguageVersion(objects, lang, noFallback) {
    const [ reqLC, reqCC ] = (lang) ? lang.toLowerCase().split('-') : [];
    const list = [];
    const existing = {};
    for (let object of objects) {
        const score = getLanguageMatch(object, reqLC, reqCC);
        const previous = existing[object.name];
        if (!previous) {
            if (score !== 0 || !noFallback) {
                existing[object.name] = { index: list.length, score };
                list.push(object);
            }
        } else if (previous.score < score) {
            list[previous.index] = object;
            previous.score = score;
        }
    }
    return list;
}

function isLocaleIdentifier(flag) {
    return /^\w{2}(\-\w{2})?$/.test(flag);
}

function getLanguageMatch(object, reqLC, reqCC) {
    let highest;
    if (reqLC && object.flags instanceof Array) {
        for (let flag of object.flags) {
            if (isLocaleIdentifier(flag)) {
                const [ lc, cc ] = flag.toLowerCase().split('-');
                let score = 0;
                if (lc === reqLC) {
                    if (cc === reqCC) {
                        score = 100;
                    } else {
                        score = 50;
                    }
                }
                if (!(highest > score)) {
                    highest = score;
                }
            }
        }
    }
    return highest;
}

function pickLanguageVersion(versions, language, noFallback) {
    const choices = [];
    for (let [ lang, text ] of Object.entries(versions)) {
        choices.push({
            flags: [ lang ],
            text,
            name: 'text'
        });
    }
    const [ chosen ] = chooseLanguageVersion(choices, language, noFallback);
    return (chosen) ? chosen.text : '';
}

export {
    chooseLanguageVersion,
    pickLanguageVersion,
    isLocaleIdentifier,
};
