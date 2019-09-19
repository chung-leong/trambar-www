import React, { useMemo, useContext, useEffect, useDebugValue } from 'react';
import { useListener, useEventTime } from 'relaks';

const Env = React.createContext();
const defEnv = {};

function useEnv() {
    const env = useContext(Env) || defEnv;
    useDebugValue(env);
    return env;
}

function useEnvMonitor(vars) {
    const browserParams = useMemo(() => {
        if (typeof(navigator) === 'object') {
            const ua = navigator.userAgent;
            const uaFragmentsBrowser = {
                firefox: 'Firefox',
                opera: 'Opera',
                ie: 'Trident',
                edge: 'Edge',
                chrome: 'Chrome',
                safari: 'Safari',
            };
            const uaFragmentsOS = {
                wp: 'Windows Phone',
                windows: 'Windows',
                ios: 'iPhone OS',
                osx: 'OS X',
                android: 'Android',
                linux: 'Linux',
            };
            let os = 'unknown', browser = 'unknown'
            for (let [ name, fragment ] of Object.entries(uaFragmentsOS)) {
                if (ua.indexOf(fragment) > -1) {
                    os = name;
                    break;
                }
            }
            for (let [ name, fragment ] of Object.entries(uaFragmentsBrowser)) {
                if (ua.indexOf(fragment) > -1) {
                    browser = name;
                    break;
                }
            }
            return { os, browser };
        }
    }, []);
    const [ displayChanged, setDisplayChanged ] = useEventTime();
    const displayParams = useMemo(() => {
        if (typeof(document) === 'object') {
            const viewport = document.documentElement;
            return {
                devicePixelRatio: window.devicePixelRatio,
                screenWidth: screen.width,
                screenHeight: screen.height,
                viewportWidth: viewport.clientWidth,
                viewportHeight: viewport.clientHeight,
                orientationType: (screen.orientation) ? screen.orientation.type : 'unknown',
            };
        }
    }, [ displayChanged ]);

    useEffect(() => {
        window.addEventListener('resize', setDisplayChanged);
        window.addEventListener('orientationchange', setDisplayChanged);
        window.addEventListener('visibilitychange', setDisplayChanged);
        return () => {
            window.removeEventListener('resize', setDisplayChanged);
            window.removeEventListener('orientationchange', setDisplayChanged);
            window.removeEventListener('visibilitychange', setDisplayChanged);
        };
    }, []);

    const deps = [
        browserParams,
        displayParams,
        ...Object.values(vars),
    ];
    return useMemo(() => {
        return {
            ...browserParams,
            ...displayParams,
            ...vars
        };
    }, deps);
}

function usePlainText(hookOpts) {
    const env = useEnv();
    const options = { ...env, ...hookOpts };
    useDebugValue(hookOpts);
    return useListener((object) => {
        return object.plainText(options);
    });
}

function useRichText(hookOpts) {
    const env = useEnv();
    const options = { ...env, ...hookOpts };
    useDebugValue(hookOpts);
    return useListener((object) => {
        return object.richText(options);
    });
}

function useLanguageFilter() {
    const env = useEnv();
    const language = env.language || 'en';
    useDebugValue(language);
    return useListener((object) => {
        return object.filter(language);
    });
}

export {
    useEnv,
    useEnvMonitor,
    useLanguageFilter,
    usePlainText,
    useRichText,
    Env,
};
