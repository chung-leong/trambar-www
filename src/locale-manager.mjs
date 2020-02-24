import { EventEmitter } from 'relaks-event-emitter';
import { LocaleManagerEvent } from './locale-manager-event.mjs';

const defaultOptions = {
  loadFunc: function() {
    return Promise.resolve({});
  },
};

class LocaleManager extends EventEmitter {
  constructor(options) {
    super();
    this.language = '';
    this.options = {};
    for (let name in defaultOptions) {
      if (options && options[name] !== undefined) {
        this.options[name] = options[name];
      } else {
        this.options[name] = defaultOptions[name];
      }
    }
    this.table = {};
    this.localize = this.localize.bind(this);
  }

  activate() {
  }

  deactivate() {
  }

  start(language) {
    return this.set(language);
  }

  set(language) {
    language = language.toLowerCase();
    if (this.language === language) {
      return Promise.resolve();
    }
    const load = this.options.loadFunc;
    return load(language).then((table) => {
      this.table = table;
      this.language = language;
      this.triggerEvent(new LocaleManagerEvent('change'));
    });
  }

  localize(phrase, params) {
    if (phrase instanceof Date) {
      return phrase.toLocaleString(this.language, params);
    }

    const translated = this.table[phrase];
    if (translated === undefined) {
      return phrase;
    } else if (translated instanceof Function) {
      try {
        return translated(params);
      } catch (err) {
        return `[${err.message}]`;
      }
    } else {
      return translated + '';
    }
  }
}

export {
  LocaleManager,
};
