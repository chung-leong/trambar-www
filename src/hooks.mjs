import React, { useContext, useDebugValue, useRef, useCallback } from 'react';
//import { useListener } from 'relaks';

const TextContext = React.createContext();

function useListener(f) {
	var ref = useRef({});
	ref.current.f = f;
	useDebugValue(f);
	return useCallback(function () {
		return ref.current.f.apply(null, arguments);
	}, []);
}

function usePlainText(hookOpts) {
    const context = useContext(TextContext);
    const options = { ...context, ...hookOpts };
    return useListener((object) => {
        return object.plainText(options);
    });
}

function useRichText(hookOpts) {
    const context = useContext(TextContext);
    const options = { ...context, ...hookOpts };
    return useListener((object) => {
        return object.richText(options);
    });
}

function useLanguageFilter() {
    const context = useContext(TextContext);
    return useListener((object) => {
		let language = 'en';
		if (context && context.language) {
			language = context.language;
		}
        return object.filter(language);
    });
}

function useDateText(options) {
	const context = useContext(TextContext);
	return useListener((date) => {
		let language = 'en';
		if (context && context.language) {
			language = context.language;
		}
		return date.toLocaleDateString(language, options);
	});
}

export {
    useLanguageFilter,
    usePlainText,
    useRichText,
	useDateText,
    TextContext,
};
