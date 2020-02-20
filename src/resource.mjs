class Resource {
  constructor(data) {
    if (data) {
      this.type = data.type;
      this.url = data.url;
      this.src = data.src;
      this.width = data.width;
      this.height = data.height;
    } else {
      this.missing = true;
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

  getImageURL() {
    if (this.missing) {
      return;
    }
    
  }
}

const missing = new Resouce;

export {
  Resource,
  missing,
};
