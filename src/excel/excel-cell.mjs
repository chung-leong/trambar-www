import { ExcelObject } from './excel-object.mjs';
import { HTMLText } from '../html-text.mjs';

class ExcelCell extends ExcelObject {
  constructor(column, data) {
    super(column.identifiers, data);

    let json, resources, type;
    if (data == null) {
      json = [ '' ];
      type = 'null';
    } else if (typeof(data) !== 'object') {
      json = [ data + '' ];
      type = 'plain';
    } else if (data.richText instanceof Array) {
      json = data.richText.map((token) => {
        const { font, text } = token;
        if (font) {
          const style = {};
          if (font.bold) {
            style.fontWeight = 'bold';
          }
          if (font.italic) {
            style.fontStyle = 'italic';
          }
          if (font.underline) {
            style.textDecoration = 'underline';
          }
          return {
            type: 'span',
            props: { style },
            children: text
          };
        } else {
          return text;
        }
      });
      type = 'rich';
    } else if (data.type === 'image' && typeof(data.url) === 'string') {
      const img = {
        type: 'img',
        src: data.url,
        width: data.width,
        height: data.height
      };
      json = [ img ];
      resources = [ data ];
      type = 'image';
    } else {
      const span = {
        type: 'span',
        props: { className: 'error', title: data.error },
        children: [ (data.error) ? '[error]' : '[invalid data]' ]
      };
      json = [ span ]
      type = 'error';
    }

    this.column = column;
    this.type = type;
    this.data = data;
    this.content = new HTMLText(json, resources);
  }
}

export {
  ExcelCell,
};
