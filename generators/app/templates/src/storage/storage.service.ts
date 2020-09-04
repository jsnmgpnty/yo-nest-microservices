import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} from '@azure/storage-blob';
const intoStream = require('into-stream');
import { OnModuleInit, Injectable } from '@nestjs/common';
import { LoggerService } from '../logging';
import { StorageOptions } from './storage-options';

@Injectable()
export class StorageService implements OnModuleInit {
  static options: StorageOptions = null;
  private blobServiceClient: BlobServiceClient;
  private ONE_MEGABYTE = 1024 * 1024;
  private uploadOptions = { bufferSize: 4 * this.ONE_MEGABYTE, maxBuffers: 20 };

  constructor(private logger: LoggerService) { }

  onModuleInit() {
    if (!StorageService.options)
      throw new Error('Failed to initialize StorageService due to missing options');

    const sharedKeyCredential = new StorageSharedKeyCredential(
      StorageService.options.accountName,
      StorageService.options.accessKey,
    );
    const pipeline = newPipeline(sharedKeyCredential);
    this.blobServiceClient = new BlobServiceClient(StorageService.options.connectionString, pipeline);
  }

  public async uploadFile(
    file: any,
    containerName: string,
    folderPath?: string,
    callback: (url: string) => Promise<void> = null,
  ): Promise<string> {
    if (folderPath) folderPath = folderPath.replace(/\/$/, '');
    const blobName = this.getBlobName();
    const stream = intoStream(file.buffer);
    const containerClient = this.blobServiceClient.getContainerClient(
      containerName
    );
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${folderPath}/${blobName}`
    );

    try {
      const result = await blockBlobClient.uploadStream(
        stream,
        this.uploadOptions.bufferSize,
        this.uploadOptions.maxBuffers,
        { blobHTTPHeaders: { blobContentType: 'image/jpeg' } }
      );
      if (!result) throw new Error(`Failed to upload media ${file.originalname} - no result from Azure`);
      let url = result._response.request.url;
      url = url.replace(StorageService.options.connectionString, '');
      if (callback) await callback(url);
      return url;
    } catch (err) {
      this.logger.error(`Failed to upload media ${file.originalname}`, err);
      throw err;
    }
  }

  private getBlobName(): string {
    // Use a random number to generate a unique file name,
    // removing "0." from the start of the string.
    const identifier =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    return identifier;
  }
}
