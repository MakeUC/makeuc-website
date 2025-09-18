const { Client } = require('pg');
const { Writable } = require('stream');
const QueryStream = require('pg-query-stream');
const { pipeline } = require('stream/promises');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();


class CsvWriter extends Writable {
  constructor(filePath, headers) {
    super({ objectMode: true });
    this.stream = fs.createWriteStream(filePath);
    this.headers = headers;
    this.isFirstRow = true;
    this.stream.write(this.formatCsvRow(this.headers) + '\n');
  }

  _write(chunk, encoding, callback) {
    const row = this.headers.map(header => chunk[header]);
    const csvRow = this.formatCsvRow(row) + '\n';
    this.stream.write(csvRow, callback);
  }

  _final(callback) {
    this.stream.end(callback);
  }

  formatCsvRow(row) {
    const escapeCsvValue = (value) => {
      if (value === null || typeof value === 'undefined') {
        return '';
      }
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };
    return row.map(escapeCsvValue).join(',');
  }
}


function validateConfig() {
  const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DATABASE } = process.env;
  if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_HOST || !POSTGRES_DATABASE) {
    throw new Error('Database connection environment variables are not set.');
  }

  const outputDir = process.argv[2];
  if (!outputDir) {
    throw new Error('An output directory path must be provided as a command-line argument. Example: node backup-db.js ./backups');
  }
  return outputDir;
}


async function backupTable(client, tableName, outputDir) {
  const filePath = path.join(outputDir, `${tableName}.csv`);
  console.log(`- Exporting table: "${tableName}" to "${filePath}"`);

  // Use a QueryStream to process rows without loading all data into memory
  const query = new QueryStream(`SELECT * FROM "${tableName}"`);
  const stream = client.query(query);

  try {
    const firstRow = await new Promise((resolve, reject) => {
      stream.once('data', (row) => {
        stream.pause();
        resolve(row);
      });
      stream.once('error', (err) => reject(err));
      stream.once('end', () => resolve(null));
    });

    if (!firstRow) {
      console.log(`- Table "${tableName}" is empty. Skipping CSV creation.`);
      return;
    }

    const headers = Object.keys(firstRow);
    const csvWriter = new CsvWriter(filePath, headers);


    stream.unshift(firstRow);
    stream.resume();

    await pipeline(stream, csvWriter);
    console.log(`- Successfully completed backup for "${tableName}".`);
  } catch (error) {
    console.error(`Error during backup of table "${tableName}": ${error.message}`);
    throw error;
  }
}


async function main() {
  let client;
  try {
    const outputDir = validateConfig();

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DATABASE } = process.env;
    client = new Client({ user: POSTGRES_USER, host: POSTGRES_HOST, database: POSTGRES_DATABASE, password: POSTGRES_PASSWORD, port: 5432 });

    await client.connect();
    console.log('Successfully connected to the database.');

    const { rows: tables } = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    `);

    console.log(`\nFound ${tables.length} tables to back up.`);

    for (const { table_name: tableName } of tables) {
      await backupTable(client, tableName, outputDir);
    }

    console.log('\nDatabase backup to CSV files completed successfully.');

  } catch (error) {
    console.error(`\nAn unrecoverable error occurred during the backup process: ${error.message}`);
    process.exit(1);
  } finally {
    if (client) {
      await client.end();
    }
  }
}

main()