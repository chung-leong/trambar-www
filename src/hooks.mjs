import React from 'react';
import { useListener, useEventTime } from 'relaks';
import { harvesting } from 'relaks-harvest';

const { useMemo, useContext, useEffect, useDebugValue } = React;

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
  const options = hookOpts;
  useDebugValue(hookOpts);
  return useListener((object) => {
    if (object && object.getLanguageSpecific instanceof Function) {
      const language = getLanguage(env);
      object = object.getLanguageSpecific(language);
    }
    if (object && object.getPlainText instanceof Function) {
      return object.getPlainText(options);
    } else if (object == null) {
      return '';
    } else {
      return object + '';
    }
  });
}

function useRichText(hookOpts) {
  const env = useEnv();
  const ratio = env.devicePixelRatio;
  const options = { ...hookOpts };
  if (ratio !== undefined) {
    if (options.imageTransform) {
      if (options.imageTransform.ratio === undefined) {
        options.imageTransform = { ...options.imageTransform, ratio };
      }
    } else {
      options.imageTransform = { ratio };
    }
  }
  useDebugValue(hookOpts);
  return useListener((object, key) => {
    if (object && object.getLanguageSpecific instanceof Function) {
      const language = getLanguage(env);
      object = object.getLanguageSpecific(language);
    }
    if (object && object.getRichText instanceof Function) {
      return object.getRichText(options, key);
    } else if (object == null) {
      return '';
    } else {
      return object + '';
    }
  });
}

function useLanguage() {
  const env = useEnv();
  const language = getLanguage(env);
  useDebugValue(language);
  return language;
}

function useLocalized() {
  const env = useEnv();
  useDebugValue(!!(env.locale && env.locale.localize instanceof Function));
  return useListener((phrase, params) => {
    const { locale } = env;
    if (locale && locale.localize instanceof Function) {
      return locale.localize(phrase, params);
    } else {
      return phrase;
    }
  });
}

let defaultLanguage;

function getLanguage(env) {
  const { locale } = env;
  if (locale && locale.language) {
    return locale.language;
  }
  if (!defaultLanguage) {
    defaultLanguage = 'en-us';
    if (typeof(process) === 'object' && process.env && process.env.LANG) {
      const m = /^([a-z]{2})[-_]([a-z]{2})/.exec(process.env.LANG);
      if (m) {
        defaultLanguage = `${m[1].toLowerCase()}-${m[2].toLowerCase()}`;
      }
    }
  }
  return defaultLanguage;
}

export {
  useEnv,
  useEnvMonitor,
  useLanguage,
  usePlainText,
  useRichText,
  useLocalized,
  Env,
};
