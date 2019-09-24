import React, { useMemo, useContext, useEffect, useDebugValue } from 'react';
import { useListener, useEventTime } from 'relaks';
import { harvesting } from 'relaks-harvest';

const Env = React.createContext();
const defEnv = {};

function useEnv() {
    const env = useContext(Env) || defEnv;
    useDebugValue(env);
    return env;
}

function useEnvMonitor(vars) {
    const browserParams = useMemo(() => {
        if (harvesting()) {
            return {};
        }
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
    }, []);
    const [ displayChanged, setDisplayChanged ] = useEventTime();
    const displayParams = useMemo(() => {
        if (harvesting()) {
            return {};
        }
        const viewport = document.documentElement;
        return {
            devicePixelRatio: window.devicePixelRatio,
            screenWidth: screen.width,
            screenHeight: screen.height,
            viewportWidth: viewport.clientWidth,
            viewportHeight: viewport.clientHeight,
            orientationType: (screen.orientation) ? screen.orientation.type : 'unknown',
        };
    }, [ displayChanged ]);
    const [ connectionChanged, setConnectionChanged ] = useEventTime();
    const connectionParams = useMemo(() => {
        if (harvesting()) {
            return {};
        }
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return {
            onLine: navigator.onLine,
            connectionType: (connection) ? connection.type || connection.effectiveType : 'unknown',
        };
    }, [ connectionChanged ]);

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
    useEffect(() => {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        window.addEventListener('online', setConnectionChanged);
        window.addEventListener('offline', setConnectionChanged);
        if (connection) {
            connection.addEventListener('typechange', setConnectionChanged);
        }
        return () => {
            window.removeEventListener('online', setConnectionChanged);
            window.removeEventListener('offline', setConnectionChanged);
            if (connection) {
                connection.removeEventListener('typechange', setConnectionChanged);
            }
        };
    }, []);

    const deps = [
        browserParams,
        displayParams,
        connectionParams,
        ...Object.values(vars),
    ];
    useDebugValue(vars);
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
        if (object.plainText instanceof Function) {
            return object.plainText(options);
        } else {
            return object + '';
        }
    });
}

function useRichText(hookOpts) {
    const env = useEnv();
    const options = { ...env, ...hookOpts };
    useDebugValue(hookOpts);
    return useListener((object) => {
        if (object.richText instanceof Function) {
            return object.richText(options);
        } else {
            return object + '';
        }
    });
}

function useLanguage() {
    const env = useEnv();
    const { locale } = env;
    let language;
    if (locale && locale.language) {
        language = locale.language;
    }
    if (!language) {
        language = 'en';
    }
    useDebugValue(language);
    return language;
}

function useLanguageFilter(noFallback) {
    const language = useLanguage();
    useDebugValue(language);
    return useListener((object) => {
        if (object.filter instanceof Function) {
            return object.filter(language, noFallback);
        } else {
            return object;
        }
    });
}

function useLocalized() {
    const env = useEnv();
    useDebugValue(!!(env.locale && env.locale.localize instanceof Function));
    return useListener((data, params) => {
        const { locale } = env;
        if (locale && locale.localize instanceof Function) {
            return locale.localize(data, params);
        } else {
            return data;
        }
    });
}

export {
    useEnv,
    useEnvMonitor,
    useLanguage,
    useLanguageFilter,
    usePlainText,
    useRichText,
    useLocalized,
    Env,
};
