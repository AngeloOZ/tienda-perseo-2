import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

type HeaderProp = {
    name: string;
    label: string;
    align?: 'left' | 'right' | 'center' | "inherit" | "justify";
    order?: boolean;
    type?: 'number' | 'string' | 'date' | 'boolean';
    serchable?: boolean;
}

export const useExportTable = () => {
    const exportXLSX = (data: any) => {
        const workSheet = XLSX.utils.json_to_sheet(data)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "hoja1")
        //Buffer
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
        //Binary string
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
        //Download
        XLSX.writeFile(workBook, "reporte.xlsx")
    }

    const exportPDF = (titulo: string, header: HeaderProp[], data: any) => {
        const doc = new jsPDF();
        doc.text(titulo, 20, 10);

        const columns = header.map((col) => ({ header: col.label, dataKey: col.name }));

        autoTable(doc, {
            theme: "striped",
            columns,
            body: data,
        })

        doc.save('reporte.pdf');
    }
    return { exportXLSX, exportPDF }
}
