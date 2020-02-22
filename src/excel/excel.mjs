import { DataSource } from '../data-source.mjs';
import { ExcelCell } from './excel-cell.mjs';
import { ExcelColumn } from './excel-column.mjs';
import { ExcelFile } from './excel-file.mjs';
import { ExcelObject } from './excel-object.mjs';
import { ExcelRow } from './excel-row.mjs';
import { ExcelSheet } from './excel-sheet.mjs';

class Excel extends DataSource {
  fetchExcelFile(fileId) {
    return this.fetchObject(ExcelFile, [ fileId ]);
  }

  findExcelFiles(criteria) {
    return this.findObjects(ExcelFile, [], criteria);
  }
}

export {
  Excel,
  ExcelCell,
  ExcelColumn,
  ExcelFile,
  ExcelObject,
  ExcelRow,
  ExcelSheet,
};
