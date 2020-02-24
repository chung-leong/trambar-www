class LocaleManagerProxy {
  constructor(localeManager) {
    this.localeManager = localeManager;
    this.language = localeManager.language;
  }

  set(language) {
    return this.localeManager.set(language);
  }

  localize(phrase, params) {
    return this.localeManager.localize(phrase, params);
  }
}

export {
  LocaleManagerProxy,
};
