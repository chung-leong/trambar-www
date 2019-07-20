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

function useLanguageFilter(target) {
    const context = useContext(TextContext);
    return useListener((object) => {
        if (context && context.language) {
            return object.filter(options, context.language);
        } else {
            return object;
        }
    });
}

export {
    useLanguageFilter,
    usePlainText,
    useRichText,
    TextContext,
};
