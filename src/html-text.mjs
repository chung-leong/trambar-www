import React from 'react';
import { getTagProperties } from 'mark-gor/src/html-tags.mjs';

class HTMLText {
  constructor(json, resources) {
    this.json = json;
    this.resources = resources;
  }

  getPlainText(options) {
    return getPlainTextFromNodes(this.json, options);
  }

  getRichText(options) {
    return getRichTextFromNodes(this.json, options);
  }

  getAvailableLanguages() {
    const codes = [];
    const choices = separateNodesByLanguages(this.json);
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
    const choices = separateNodesByLanguages(this.json);
    const chosen = chooseLanguageVersion(choices, lang);
    const json = [];
    for (let choice of chosen) {
      for (let node of choice.nodes) {
        json.push(node);
      }
    }
    return new HTMLText(json, this.resources);
  }

  getJSON(title) {
    let titleFound = false;
    for (let node of this.json) {
      if (node instanceof Object) {
        if (/^h[1-6]$/.test(node.type)) {
          const text = getPlainTextFromNode(node, {}).trim();
          titleFound = (text === title);
        } else if (node.type === 'pre') {
          if (titleFound && node.children instanceof Array) {
            for (let child of node.children) {
              if (child.type === 'code') {
                const text = getPlainTextFromNode(child, {});
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
}


function getPlainTextFromNodes(nodes, options, key, parent) {
  const list = [];
  if (nodes instanceof Array) {
    const blockLevel = nodes.map(isBlockLevel);
    for (let [ index, child ] of nodes.entries()) {
      const text = getPlainTextFromNode(child, options, index, parent);
      if (blockLevel[index - 1] && blockLevel[index + 1]) {
        // ignore whitespaces between block level elements
        if (child.type === 'text' && !text.trim()) {
          continue;
        }
      }
      list.push(text);
    }
  }
  const text = list.join('');
  if (!parent) {
    return text.trim();
  } else {
    return text;
  }
}

function getPlainTextFromNode(node, options, key, parent) {
  if (typeof(node) === 'object') {
    const { type, props, children } = node;
    if (type === 'br') {
      return '\n';
    } else if (type === 'img') {
      return (props.alt) ? `[${props.alt}]` : ``;
    } else {
      const innerText = getPlainTextFromNodes(children, options, key, node);
      const outerText = wrapPlainText(innerText, node, parent);
      return outerText;
    }
  } else if (typeof(node) === 'string') {
    return normalizeWhitespaces(node);
  }
}

function getRichTextFromNodes(nodes, options, key) {
  const list = []
  if (nodes instanceof Array) {
    for (let [ index, child ] of nodes.entries()) {
      const element = getRichTextFromNode(child, options, index);
      list.push(element);
    }
  }
  if (key === undefined) {
    return createElement(React.Fragment, {}, list, options);
  } else {
    return (list.length > 0) ? list : undefined;
  }
}

function getRichTextFromNode(node, options, key) {
  if (typeof(node) === 'object') {
    const { type, props, children } = node;
    let contents;
    if (children instanceof Array) {
      contents = [];
      for (let [ index, child ] of children.entries()) {
        contents.push(getRichTextFromNode(child, options, index));
      }
    }
    return createElement(type, { ...props, key }, contents, options);
  } else if (typeof(node) === 'string') {
    const text = normalizeWhitespaces(node);
    return createElement(undefined, { key }, text, options);
  }
}

function createElement(type, props, children, options) {
  const { adjustFunc } = options || {};
  if (adjustFunc instanceof Function) {
    const result = adjustFunc(type, props, children);
    if (result !== undefined) {
      if (result === null) {
        return null;
      }
      if (!(result instanceof Object)) {
        throw new Error('Function should return an object');
      }
      type = result.type;
      props = result.props;
      children = result.children;
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (children && typeof(children) !== 'string') {
      children = React.Children.toArray(children);
    }
  }
  if (type === undefined) {
    return children;
  } else {
    return React.createElement(type, props, children);
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

function wrapPlainText(innerText, node, parent) {
  if (isBlockLevel(node)) {
    let text = innerText.trim();
    if (!/\n$/.test(text)) {
      text += '\n';
    }
    switch (node.type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
      case 'p':
        if (!/\n\n$/.test(text)) {
          text += '\n';
        }
        break;
      case 'li':
        if (parent && parent.name === 'ol') {
          let num = 1;
          for (let child of parent.children) {
            if (child === node) {
              break;
            }
            if (child.name === 'li') {
              num++;
            }
          }
          text = `${num}. ${text}`;
        } else {
          text = `* ${text}`;
        }
        break;
      case 'hr':
        text = '――――――――――\n';
        break;
    }
    return text;
  } else {
    return innerText;
  }
}

function normalizeWhitespaces(text) {
    return text.replace(/\s+/g, ' ');
}

function isLanguageCode(text) {
  return /^[a-z]{2}(\-[a-z]{2})?$/i.test(text);
}

function separateNodesByLanguages(nodes) {
  const choices = [];
  let topic = 0;
  let languages;
  let choice;
  for (let node of nodes) {
    const newLanguages = getLanguageCodesFromNode(node);
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

function getLanguageCodesFromNode(node) {
  if (node instanceof Object && /^h[1-6]$/.test(node.type)) {
    const text = getPlainTextFromNode(node, {}).trim();
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
  HTMLText,
  isLanguageCode,
  findLanguageCodes,
  getLanguageMatch,
  chooseLanguageVersion,
};
