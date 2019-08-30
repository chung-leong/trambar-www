import { DataSource } from '../data-source.mjs';
import { ExcelFile } from './excel-file.mjs';

class Excel extends DataSource {
    async fetchExcelFile(identifier) {
        const url = this.getDataURL([ 'excel', identifier ]);
        const file = await this.fetchObject(url, ExcelFile.create);
        return file;
    }

    async fetchExcelFiles() {
        const url = this.getDataURL([ 'excel' ]);
        const files = await this.fetchObjects(url, ExcelFile.create);
        return files;
    }
}

export {
    Excel,
};
