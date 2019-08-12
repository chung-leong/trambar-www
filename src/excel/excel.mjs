import { DataSource } from '../data-source.mjs';
import { ExcelFile } from './excel-file.mjs';

class Excel extends DataSource {
    async fetchExcelFile(name) {
        const url = this.getURL([ 'excel', name ]);
        const file = await this.fetchObject(url, ExcelFile.create);
        return file;
    }

    async fetchExcelFiles(prefix) {
        const url = this.getURL([ 'excel' ], { prefix });
        const files = await this.fetchObjects(url, ExcelFile.create);
        return files;
    }
}

export {
    Excel,
};
