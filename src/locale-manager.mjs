import { EventEmitter } from 'relaks-event-emitter';
import { LocaleManagerEvent } from './locale-manager-event.mjs';

const defaultOptions = {
  loadFunc: async function() {
    return {};
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

  async start(language) {
    await this.set(language);
  }

  async set(language) {
    if (this.language !== language) {
      language = language.toLowerCase();
      const load = this.options.loadFunc;
      this.table = await load(language);
      this.language = language;
      this.triggerEvent(new LocaleManagerEvent('change'));
    }
  }

  localize(phrase, params) {
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
  LocaleManagerEvent,
};
