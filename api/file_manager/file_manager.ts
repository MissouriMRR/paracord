import * as fs from 'fs'
import { google, drive_v3 } from 'googleapis'
import { OAuth2Client } from 'googleapis-common'
import { GaxiosError, GaxiosResponse } from 'gaxios'
import { getAuthorizedClient, getCredentials } from './access'

export async function createFile(
    fileName: string,
    mimeType: string,
    folderId: string,
    fileStream: fs.ReadStream
): Promise<string> {
    const auth: OAuth2Client = getAuthorizedClient(
        JSON.parse(getCredentials().toString())
    )
    const drive = google.drive({ version: 'v3', auth })

    var fileMetadata = {
        name: fileName,
        parents: [folderId],
    }
    var media = {
        mimeType: mimeType,
        body: fileStream,
    }

    try {
        var file: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create(
            {
                requestBody: fileMetadata,
                media: media,
                fields: 'id',
            }
        )
        return file.data.id
    } catch (err) {
        console.log(err)
    }
}

export async function createFolder(folderName: string): Promise<string> {
    const auth: OAuth2Client = getAuthorizedClient(
        JSON.parse(getCredentials().toString())
    )
    const drive = google.drive({ version: 'v3', auth })

    var fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
    }

    try {
        var file: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create(
            {
                requestBody: fileMetadata,
                fields: 'id',
            }
        )
        return file.data.id
    } catch (err) {
        console.log(err)
    }
}
