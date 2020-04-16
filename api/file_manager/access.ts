import privateKey from '../private_key.json'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

const SCOPES: string[] = ['https://www.googleapis.com/auth/drive']

//Load JWT auth client
export async function getJWTAuth(): Promise<JWT> {
    let JWTAuth: JWT = new google.auth.JWT(
        privateKey.client_email,
        null,
        privateKey.private_key,
        SCOPES
    );
    try {
        await JWTAuth.authorize()
        return JWTAuth
    } catch (err) {
        console.error('Error loading JWT Auth: ', err)
    }
}
