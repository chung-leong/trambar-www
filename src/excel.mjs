import { DataSource } from './data-source.mjs';
import { ExcelFile } from './excel-file.mjs';

class Excel extends DataSource {
    async fetchExcelFile(name) {
        const url = this.getURL([ 'excel', name ]);
        const file = await this.fetchObject(url, { transform: ExcelFile.create });
        return file;
    }

    async fetchExcelFiles(filter) {
        const url = this.getURL([ 'excel' ], { filter });
        const files = await this.fetchObjects(url, { transform: ExcelFile.create });
        return files;
    }
}

export {
    Excel,
};
