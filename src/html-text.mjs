import React from 'react';
import { getTagProperties } from 'mark-gor/src/html-tags.mjs';

class HTMLText {
  constructor(json, resources, languageCodes) {
    this.json = json;
    this.resources = resources;
    this.languageCodes = languageCodes;
  }

  getPlainText(options) {
    return getPlainTextFromNodes(this.json, options);
  }

  getRichText(options) {
    return getRichTextFromNodes(this.json, options);
  }

  getAvailableLanguages() {

  }

  getLanguageSpecific(code) {
    if (this.languageCodes) {
      const score = getLanguageMatch(this.languageCodes, code);
      return (score > 0) ? this : null;
    } else {
      const sections = separateNodesByLanguages(this.json);
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
  return /^[a-z]{2}(\-[a-z]{2})?$/.test(text);
}

function separateNodesByLanguages(nodes) {
  const sections = [];
  let topic = 0;
  let languages;
  let section;
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
      section = undefined;
      continue;
    }
    if (!section) {
      section = { languages, topic, nodes: [] };
      sections.push(section);
    }
    section.nodes.push(block);
  }
  return sections;
}

function getLanguageCodesFromNode(node) {
  if (node instanceof Object && /^h[1-6]$/.test(node.type)) {
    const text = getPlainTextFromNode(node, {});
    const m = /^\s*\((.*)\)\s*$/.exec(text);
    if (m) {
      const codes = [];
      const flags = m[1].split(/\s*,\s*/);
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
      if (codes.length > 0 || rest) {
        return codes;
      }
    }
  }
}

function chooseLanguageVersion(sections, lang) {
  const list = [];
  const existing = {};
  for (let section of sections) {
    const score = getLanguageMatch(object, lang);
    const previous = existing[object.name];
    if (!previous) {
      if (score !== 0) {
        existing[object.name] = { index: list.length, score };
        list.push(object);
      }
    } else if (previous.score < score) {
      list[previous.index] = object;
      previous.score = score;
    }
  }
  return list;
}

function getLanguageMatch(languageCodes, lang) {
  const [ reqLC, reqCC ] = (lang) ? lang.toLowerCase().split('-') : [];

    let highest;

    if (reqLC && object.flags instanceof Array) {
        for (let flag of ) {
            if (isLocaleIdentifier(flag)) {
                const [ lc, cc ] = flag.toLowerCase().split('-');
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
        }
    }
    return highest;
}

export {
  HTMLText,
  isLanguageCode
};
