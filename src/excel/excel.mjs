import { DataSource } from '../data-source.mjs';
import { ExcelFile } from './excel-file.mjs';

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
};
