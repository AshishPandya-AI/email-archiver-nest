import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GoogleAuthService {
  getOAuth2Client() {
    const credentials = JSON.parse(fs.readFileSync('src/google/credentials.json', 'utf8'));
    const { client_id, client_secret, redirect_uris } = credentials.installed;
    return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  }
}
