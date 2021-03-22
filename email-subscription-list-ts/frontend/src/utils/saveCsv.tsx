import { CustomerData } from '../interfaces/CustomerData';

export const saveCsv = (rows: CustomerData[]): string => {
  let csvContent = '';

  const headers =
    'timestamp;email;utm_source;utm_medium;utm_term;utm_campaign;utm_content\n';

  csvContent += headers;

  csvContent += rows
    .map((row) => {
      let rowStr = '';

      rowStr += row.timestamp;
      rowStr += ';';
      rowStr += row.email.toString();
      rowStr += ';';
      rowStr += row.utm_source.toString();
      rowStr += ';';
      rowStr += row.utm_medium.toString();
      rowStr += ';';
      rowStr += row.utm_term.toString();
      rowStr += ';';
      rowStr += row.utm_campaign.toString();
      rowStr += ';';
      rowStr += row.utm_content.toString();

      return rowStr;
    })
    .join('\n');

  return csvContent;
};
