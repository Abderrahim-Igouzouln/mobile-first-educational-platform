import PDFDocument from 'pdfkit';

export class PdfGeneratorService {
  generateCertificate(params: {
    recipientName: string;
    technologyName: string;
    scorePercent: number;
    certificateNumber: string;
    issuedAt: Date;
  }): Buffer {
    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => buffers.push(chunk));

    doc.fontSize(24).text('DevEduForge', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('This certifies that', { align: 'center' });
    doc.fontSize(22).text(params.recipientName, { align: 'center' });
    doc.fontSize(14).text(`has successfully completed the ${params.technologyName} course`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Score: ${params.scorePercent}%`, { align: 'center' });
    doc.text(`Certificate: ${params.certificateNumber}`, { align: 'center' });
    doc.text(`Date: ${params.issuedAt.toLocaleDateString()}`, { align: 'center' });

    doc.end();

    return Buffer.concat(buffers);
  }
}
