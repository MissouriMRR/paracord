import * as fs from 'fs'
import { drive_v3 }  from 'googleapis'
import { GaxiosResponse } from 'gaxios'
import { getAuthorizedDrive } from './access'

export async function createFile(
    fileName: string,
    mimeType: string,
    folderId: string,
    fileStream: fs.ReadStream
): Promise<string> {
    const drive: drive_v3.Drive = await getAuthorizedDrive()

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
                supportsTeamDrives: true,
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
    const drive: drive_v3.Drive = await getAuthorizedDrive()

    var fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    }

    try {
        var file: GaxiosResponse<drive_v3.Schema$File> = await drive.files.create(
            {
                supportsTeamDrives: true,
                requestBody: fileMetadata,
                fields: 'id',
            }
        )
        return file.data.id

    } catch (err) {
        console.log(err)
    }
}

export async function deleteFolder(folderId: string): Promise<void> {
    const drive: drive_v3.Drive = await getAuthorizedDrive()

    try {
        await drive.files.delete({
            supportsTeamDrives: true,
            fileId: folderId
        })
    } catch (err) {
        console.log(err)
    }
}

//this is for debugging purposes.
export async function listFiles(): Promise<void> {
    const drive: drive_v3.Drive = await getAuthorizedDrive()

    const response: GaxiosResponse<drive_v3.Schema$FileList> = await drive.files.list({
        supportsTeamDrives: true,  
        includeTeamDriveItems: true
    })
    const files: drive_v3.Schema$File[] = response.data.files
    
    console.log('\n\nVIDEOS IN DRIVE: \n\n')
    for(var i = 0; i < files.length; i++) {
        console.log(files[i].name + " " + files[i].id)
    }
    console.log('\n\n')
}