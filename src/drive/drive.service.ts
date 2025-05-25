import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as stream from 'stream';
import * as fs from 'fs';

@Injectable()
export class DriveService {
  private driveClient = google.drive({ version: 'v3', auth: this.getAuthClient() });

  private getAuthClient() {
    const credentials = JSON.parse(fs.readFileSync('src/google/credentials.json', 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed;
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  }

  async uploadFile(fileName: string, buffer: Buffer): Promise<string> {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const res = await this.driveClient.files.create({
      requestBody: { name: fileName },
      media: {
        mimeType: 'application/octet-stream',
        body: bufferStream,
      },
    });
    return `https://drive.google.com/file/d/${res.data.id}/view`;
  }
}
