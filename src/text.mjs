import React from 'react';
import { Resource } from './resource.mjs';
import { getTagProperties } from 'mark-gor/src/html-tags.mjs';

class Text {
  constructor(data) {
    if (data) {
      this.json = data.json;
      if (data.resources instanceof Array) {
        this.resources = data.resources.map(resource => new Resource(resource));
      }
    }
  }

  getPlainText(options) {
    const node = { children: this.json };
    const text = this.getPlainTextFromNode(node, options || {});
    return text.trim();
  }

  getRichText(options) {
    const node = { children: this.json };
    return this.getRichTextFromNode(node, options || {});
  }

  getAvailableLanguages() {
    const codes = [];
    const choices = this.separateNodesByLanguages(this.json);
    for (let choice of choices) {
      if (choice.languages) {
        for (let code of choice.languages) {
          if (codes.indexOf(code) === -1) {
            codes.push(code);
          }
        }
      }
    }
    return codes;
  }

  getLanguageSpecific(lang) {
    const choices = this.separateNodesByLanguages(this.json);
    const chosen = chooseLanguageVersion(choices, lang);
    const json = [];
    const resources = this.resources;
    for (let choice of chosen) {
      for (let node of choice.nodes) {
        json.push(node);
      }
    }
    return new Text({ json, resources });
  }

  getJSON(title) {
    let titleFound = false;
    for (let node of this.json) {
      if (node instanceof Object) {
        if (/^h[1-6]$/.test(node.type)) {
          const text = this.getPlainTextFromNode(node, {}).trim();
          titleFound = (text === title);
        } else if (node.type === 'pre') {
          if (titleFound && node.children instanceof Array) {
            for (let child of node.children) {
              if (child.type === 'code') {
                const text = this.getPlainTextFromNode(child, {});
                try {
                  return JSON.parse(text);
                } catch (err) {
                  console.error(err);
                }
              }
            }
          }
        }
      }
    }
  }

  getImage(url) {
    if (this.resources) {
      for (let resource of this.resources) {
        if (resource.type === 'image') {
          if (resource.matchURL(url)) {
            return resource;
          }
        }
      }
    }
    return new Resource({ type: 'image', src: url });
  }

  getPlainTextFromNode(node, options) {
    if (typeof(node) === 'object') {
      const { type, props, children } = node;
      if (type === 'br') {
        return '\n';
      } else if (type === 'hr') {
        return '――――――――――\n';
      } else if (type === 'img') {
        return (props && props.alt) ? `[${props.alt}]` : ``;
      }

      let text = '';
      if (children instanceof Array) {
        const blockLevels = children.map(isBlockLevel);
        let marker = 1;
        if (type === 'ol') {
          if (props && props.start !== undefined) {
            const start = parseInt(props.start);
            if (!isNaN(start)) {
              marker = start;
            }
          }
        }
        for (let [ index, child ] of children.entries()) {
          if (typeof(child) === 'string') {
            if (blockLevels[index - 1] && blockLevels[index + 1]) {
              if (!child.trim()) {
                // ignore whitespaces between block level elements
                continue;
              }
            }
          }

          let ctext = this.getPlainTextFromNode(child, options);
          if (typeof(node) === 'object') {
            if (blockLevels[index]) {
              ctext = ctext.replace(/^ +/, '').replace(/ +$/, '');
              ctext += '\n';
            }

            if (/h[1-6]|p|pre|ol|ul/.test(child.type)) {
              if (!ctext.endsWith('\n\n')) {
                ctext += '\n';
              }
            } else if (child.type === 'li') {
              if (type === 'ol') {
                ctext = `${marker}. ${ctext}`;
                marker++;
              } else {
                ctext = `* ${ctext}`;
              }
            }
          }
          text += ctext;
        }
      }
      return text;
    } else if (typeof(node) === 'string') {
      const text = normalizeWhitespaces(node);
      return text;
    }
  }

  getRichTextFromNode(node, options, key) {
    const { renderFunc } = options;
    if (renderFunc) {
      const result = renderFunc.call(this, node, key);
      if (result !== undefined) {
        return result;
      }
    }

    if (typeof(node) === 'object') {
      let { type, props, children } = node;
      if (type === undefined) {
        type = React.Fragment;
      }
      if (children instanceof Array) {
        children = children.map((child, index) => {
          return this.getRichTextFromNode(child, options, index);
        });
      }
      props = { key, ...props };
      return React.createElement(type, props, children);
    } else if (typeof(node) === 'string') {
      const text = normalizeWhitespaces(node);
      return text;
    }
  }


  separateNodesByLanguages() {
    const choices = [];
    let topic = 0;
    let languages;
    let choice;
    for (let node of this.json) {
      const newLanguages = this.getLanguageCodesFromNode(node);
      if (newLanguages) {
        if (newLanguages.length > 0) {
          if (!languages) {
            topic++;
          }
          languages = newLanguages;
        } else {
          if (languages) {
            topic++;
          }
          languages = undefined;
        }
        choice = undefined;
        continue;
      }
      if (!choice) {
        choice = { languages, name: 'T' + topic, nodes: [] };
        choices.push(choice);
      }
      choice.nodes.push(node);
    }
    return choices;
  }

  getLanguageCodesFromNode(node) {
    if (node instanceof Object && /^h[1-6]$/.test(node.type)) {
      const text = this.getPlainTextFromNode(node, {}).trim();
      const m = /^\((.*)\)$/.exec(text);
      if (m) {
        const codes = [];
        const flags = m[1].trim().split(/\s*,\s*/);
        let reset = false;
        for (let flag of flags) {
          if (isLanguageCode(flag)) {
            const code = flag.toLowerCase();
            if (code !== 'zz') {
              codes.push(code);
            } else {
              reset = true;
            }
          }
        }
        if (codes.length > 0 || reset) {
          return codes;
        }
      }
    }
  }

  toString() {
    return this.getPlainText();
  }
}

function isBlockLevel(node) {
  if (typeof(node) === 'object') {
    const tag = getTagProperties(node.type);
    return !!tag.block;
  } else {
    return false;
  }
}

function normalizeWhitespaces(text) {
  return text.replace(/\s+/g, ' ');
}

function isLanguageCode(text) {
  return /^[a-z]{2}(\-[a-z]{2})?$/i.test(text);
}

function chooseLanguageVersion(choices, lang) {
  const list = [];
  const existing = {};
  for (let object of choices) {
    const score = getLanguageMatch(object.languages, lang);
    const previous = existing[object.name];
    if (!previous) {
      existing[object.name] = { index: list.length, score };
      list.push(object);
    } else if (previous.score < score) {
      list[previous.index] = object;
      previous.score = score;
    }
  }
  return list;
}

function getLanguageMatch(languageCodes, lang) {
  if (languageCodes instanceof Array) {
    let highest;
    const [ reqLC, reqCC ] = lang.split('-');
    for (let languageCode of languageCodes) {
      const [ lc, cc ] = languageCode.split('-');
      let score = 0;
      if (lc === reqLC) {
        if (cc === reqCC) {
          score = 100;
        } else {
          score = 50;
        }
      }
      if (!(highest > score)) {
        highest = score;
      }
    }
    return highest;
  } else {
    return 1;
  }
}

function findLanguageCodes(flags, defaultLanguages) {
  const codes = [];
  if (flags instanceof Array) {
    for (let flag of flags) {
      if (isLanguageCode(flag)) {
        codes.push(flag.toLowerCase());
      }
    }
  }
  return (codes.length > 0) ? codes : defaultLanguages || [];
}

export {
  Text,
  isLanguageCode,
  findLanguageCodes,
  getLanguageMatch,
  chooseLanguageVersion,
};
