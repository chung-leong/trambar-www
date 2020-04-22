import { DataSource } from '../data-source.mjs';
import { ExcelFile } from './excel-file.mjs';

class Excel extends DataSource {
  /**
   * Fetch an Excel file
   *
   * @param  {string} [fileId]
   *
   * @return {Promise<ExcelFile>}
   */
  fetchExcelFile(fileId) {
    return this.findFileId(fileId).then((fileId) => {
      return this.fetchObject(ExcelFile, [ fileId ]);
    });
  }

  /**
   * Find matching Excel files
   *
   * @param  {Object} [criteria]
   *
   * @return {Promise<ExcelFile[]>}
   */
  findExcelFiles(criteria) {
    return this.findObjects(ExcelFile, [], criteria || {});
  }

  /**
   * Return id of first file if no id is given
   *
   * @param  {string} fileId
   *
   * @return {Promise<string>}
   */
  findFileId(fileId) {
    if (fileId) {
      return Promise.resolve(fileId);
    } else {
      return this.findExcelFiles().then((files) => {
        return (files[0]) ? files[0].id : '';
      });
    }
  }
}

export {
  Excel,
};
