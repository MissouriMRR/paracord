import privateKey from '../private_key.json'
import { google, drive_v3 } from 'googleapis'
import { JWT } from 'google-auth-library'

const SCOPES: string[] = ['https://www.googleapis.com/auth/drive']

//Load JWT authentication
export async function getAuthorizedDrive(): Promise<drive_v3.Drive> {
    let JWTAuth: JWT = new google.auth.JWT(
        privateKey.client_email,
        null,
        privateKey.private_key,
        SCOPES
    );

    try {
        await JWTAuth.authorize()
    } catch (err) {
        console.error('Error loading JWT Auth: ', err)
    }

    const drive: drive_v3.Drive = google.drive({
        version: 'v3', 
        auth: JWTAuth
    })

    return drive
}
