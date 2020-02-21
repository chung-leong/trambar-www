class Resource {
  constructor(data) {
    if (data) {
      this.type = data.type;
      this.src = data.src;
      this.url = data.url;
      this.width = data.width;
      this.height = data.height;
      this.external = false;
      if (!this.url) {
        this.url = this.src;
        this.external = true;
      }
    }
  }

  matchURL(url) {
    if (typeof(url) !== 'string') {
      if (this.src === url) {
        return true;
      }
      if (this.url === url) {
        return true;
      }
      if (url && url.startWith(this.url)) {
        if (url.charAt(this.url.length) === '/') {
          return true;
        }
      }
    }
    return false;
  }

  transform() {
    if (this.external) {
      return this;
    }
  }
}

export {
  Resource,
};
