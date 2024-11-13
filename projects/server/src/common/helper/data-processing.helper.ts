import { Injectable, Logger } from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import * as csv from 'csv-parser';
import { createReadStream, createWriteStream, mkdir } from 'fs';
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';
import * as stream from 'stream';
import { promisify } from 'util';

export class DataProcessingHelper {
  private readonly logger = new Logger(DataProcessingHelper.name);
  private static instance: DataProcessingHelper;
  private csvData: number[][] = [];
  private readonly ZIP_URL = 'https://www.playnow.com/resources/documents/downloadable-numbers/LOTTOMAX.zip';
  private readonly ZIP_PATH = join(resolve('./'), 'data', 'LOTTOMAX.zip');
  private readonly EXTRACT_TO_PATH = join(resolve('./'), 'data');

  static getInstance(): DataProcessingHelper {
    if (!this.instance) {
      this.instance = new DataProcessingHelper();
    }
    return this.instance;
  }

  private constructor() {
    this.readData();
  }

  private async downloadZip(url: string, outputPath: string) {
    const pipeline = promisify(stream.pipeline);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`unexpected response ${response.statusText}`);
    }
    await pipeline(response.body, createWriteStream(outputPath));
  }

  private async unzipFile(zipPath: string, extractToPath: string) {
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractToPath, true);
  }

  private async readData() {
    this.logger.log('Reading data...');

    readdir(this.EXTRACT_TO_PATH)
      .then((files) => {
        if (files.length === 0) {
          this.logger.error('No files found in directory:', this.EXTRACT_TO_PATH);
          this.rewriteData();
        }
        files.forEach((file) => {
          if (file.includes('.csv')) {
            const filePath = join(this.EXTRACT_TO_PATH, file);
            this.logger.log('Reading file:', filePath);
            const temp = [];
            createReadStream(filePath)
              .pipe(csv())
              .on('data', (data) => {
                temp.push(data);
              })
              .on('end', () => {
                this.csvData = temp.map((item) => [
                  parseInt(item['NUMBER DRAWN 1']),
                  parseInt(item['NUMBER DRAWN 2']),
                  parseInt(item['NUMBER DRAWN 3']),
                  parseInt(item['NUMBER DRAWN 4']),
                  parseInt(item['NUMBER DRAWN 5']),
                  parseInt(item['NUMBER DRAWN 6']),
                  parseInt(item['NUMBER DRAWN 7']),
                  parseInt(item['BONUS NUMBER']),
                  item['DRAW DATE']
                ]);
              });
          }
        });
      })
      .catch((err) => {
        this.logger.error('Error reading files from directory: ' + err);
      });
  }

  async rewriteData() {
    await this.downloadZip(this.ZIP_URL, this.ZIP_PATH);
    this.logger.log('Downloaded zip file');
    await this.unzipFile(this.ZIP_PATH, this.EXTRACT_TO_PATH);
    this.logger.log('Unzipped file');
    await this.readData();
    return this.csvData;
  }

  getUniqueNumbers(lotteryResults: number[][]): number[] {
    const allNumbers = lotteryResults.flat();
    return Array.from(new Set(allNumbers));
  }

  getRandomSample(arr: number[], sampleSize: number = 8): number[] {
    const shuffled = arr.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, sampleSize);
  }

  getCSVData(): number[][] {
    return this.csvData;
  }

  getLatestDraw(): any[] {
    let length = this.csvData.length;
    let lastDraw = this.csvData[length - 1];
    while (--length) {
      const date = lastDraw[8];
      const currDraw = this.csvData[length];
      const currDate = currDraw[8];
      if (date !== currDate) {
        break;
      } else {
        lastDraw = currDraw;
      }
    }
    return lastDraw;
  }

  async backupData() {
    const date = new Date().toISOString().split('T')[0];
    const backupPath = join(resolve('./'), 'backups', date);
    mkdir(backupPath, { recursive: true }, (err) => {
      if (err) {
        this.logger.error('Error creating backup directory:', err);
      }
    });
  }
}
