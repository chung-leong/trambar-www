class Resource {
  constructor(data) {
    if (data) {
      this.type = data.type;
      this.src = data.src;
      this.url = data.url;
      this.width = data.width;
      this.height = data.height;
      this.derived = false;
    }
  }

  matchURL(url) {
    if (typeof(url) === 'string') {
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

  transform(styles) {
    if (this.derived) {
      throw new Error('Cannot transform a derived image');
    }

    const filters = [];
    const remaining = {};
    let cropping = true;
    let finalWidth, finalHeight;
    let rotation, format;
    for (let [ name, value ] of Object.entries(styles)) {
      switch (name) {
        case 'crop': cropping = value; break;
        case 'width': finalWidth = value; break;
        case 'height': finalHeight = value; break;
        case 'rotate': rotation = value; break;
        case 'format': format = value; break;
        default: remaining[name] = value;
      }
    }
    let originalWidth = this.width;
    let originalHeight = this.height;
    if (rotation) {
      while (rotation < 0) {
        rotation += 360;
      }
      if ((rotation % 90) !== 0) {
        throw new Error(`Cannot rotation image by ${rotation} degrees`);
      }
      if (rotation !== 0) {
        if (rotation === 90 || rotation === 270) {
          originalWidth = this.height;
          originalHeight = this.width;
        }
        filters.push(filterEncoders.rotate(rotation));
      }
    }
    if (!finalWidth) {
      if (finalHeight) {
        finalWidth = Math.ceil(originalWidth * finalHeight / originalHeight);
      } else {
        finalWidth = originalWidth;
        finalHeight = originalHeight;
      }
    } else {
      if (!finalHeight) {
        finalHeight = Math.ceil(originalHeight * finalWidth / originalWidth)
      }
    }
    if (finalWidth !== originalWidth || finalHeight !== originalHeight) {
      let cropWidth = originalWidth;
      let cropHeight = originalHeight;
      if (cropping) {
        const originalAspectRatio = originalWidth / originalHeight;
        const finalAspectRatio = finalWidth / finalHeight;
        if (Math.abs(originalAspectRatio - finalAspectRatio) > 0.01) {
          let left, top, width, height;
          if (originalAspectRatio > finalAspectRatio) {
            width = Math.round(originalHeight * finalAspectRatio);
            height = originalHeight;
            top = 0;
            left = Math.floor((originalWidth - width) / 2);
          } else {
            width = originalWidth;
            height = Math.round(originalWidth / finalAspectRatio);
            top = Math.floor((originalHeight - height) / 2);
            left = 0;
          }
          filters.push(filterEncoders.crop({ left, top, width, height }));
          cropWidth = width;
          cropHeight = height;
        }
      }
      if (finalWidth !== cropWidth || finalHeight !== cropHeight) {
        filters.push(filterEncoders.resize({ width: finalWidth, height: finalHeight }));
      }
    }

    // add remaining filters
    for (let [ name, value ] of Object.entries(remaining)) {
      if (value) {
        const filterEncoder = filterEncoders[name];
        if (filterEncoder) {
          const filter = filterEncoder(value);
          if (filter) {
            filters.push(filter);
          }
        } else {
          throw new Error(`Unrecognized operation: '${name}'`);
        }
      }
    }
    let filename = filters.join('-');
    if (format) {
      if (/^jpeg$/.test(format)) {
        filename += `.jpg`;
      } else {
        filename += `.${format.toLowerCase()}`;
      }
    }
    let url = this.url;
    if (!url.endsWith('/')) {
      url += '/';
    }
    url += filename;

    const resource = new this.constructor;
    resource.type = this.type;
    resource.src = this.src;
    resource.url = url;
    resource.width = finalWidth;
    resource.height = finalHeight;
    resource.derived = true;
    return resource;
  }
}

const filterEncoders = {
  background: (value) => {
    if (value instanceof Array) {
      value = {
        r: value[0],
        g: value[1],
        b: value[2],
        a: value[3],
      };
    } else if (typeof(value) === 'string') {
      const hex = value.replace(/^\s*#\s*/, '');
      const digits = (value.length >= 6) ? 2 : 1;
      value = {
        r: parseInt(value.substr(0 * digits, digits), 16),
        g: parseInt(value.substr(1 * digits, digits), 16),
        b: parseInt(value.substr(2 * digits, digits), 16),
      };
    }
    const r = Math.round((value.r || 0) / 255 * 100);
    const g = Math.round((value.g || 0) / 255 * 100);
    const b = Math.round((value.b || 0) / 255 * 100);
    const a = (typeof(value.a) === 'number') ? Math.round(value.a * 100) : 100;
    return `ba${r}_${g}_${b}_${a}`;
  },
  blur: (value) => {
    if (value === true) {
      value = 0.3;
    }
    const sigma = Math.round(value * 10);
    return `bl${sigma}`;
  },
  crop: (value) => {
    const { left, top, width, height } = value;
    return `cr${left}_${top}_${width}_${height}`;
  },
  extract: function(value) {
    const channel = value;
    return `ex${channel}`;
  },
  flip: function() {
    return `fli`;
  },
  flop: function() {
    return `flo`;
  },
  gamma: function(value) {
    const gamma = (typeof(value) === 'number') ? Math.round(value * 10) : 22;
    return `ga${gamma}`;
  },
  grayscale: function() {
    return `gr`;
  },
  negate: function() {
    return `ne`;
  },
  normalize: function() {
    return `no`;
  },
  lossless: function(value) {
    if (value) {
      return `lo`;
    }
  },
  quality: function(value) {
    if (value) {
      return `q${value}`;
    }
  },
  resize: (value) => {
    const { width, height } = value;
    return `re${width}_${height}`;
  },
  rotate: (value) => {
    const degrees = value;
    return `ro${degrees}`;
  },
  sharpen: function(value) {
    if (value) {
      return `sh`;
    }
  },
};

export {
  Resource,
};
