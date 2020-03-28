import * as fs from 'fs'
import * as readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client } from 'googleapis-common'
import { GaxiosError } from 'gaxios'
import { Credentials } from 'google-auth-library'

//Boilerplate code taken from the google drive API documentation

// If modifying these scopes, delete token.json.
const SCOPES: string[] = ['https://www.googleapis.com/auth/drive']

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH: string = 'token.json'

//Load Client Secret
export function getCredentials(): Buffer {
    try {
        return fs.readFileSync('credentials.json')
    } catch (err) {
        console.error('Error loading client secret file:', err)
    }
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

export function getAuthorizedClient(credentials: any): OAuth2Client {
    console.log('getAuthorizedClient()')

    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client: OAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    )

    // Check if we have previously stored a token.
    //fs.readFile(TOKEN_PATH, (err, token) => {
    // if (err) return getAccessToken(oAuth2Client)
    // oAuth2Client.setCredentials(JSON.parse(token.toString()))
    // })

    // Check if we have previously stored a token.
    try {
        const token: Buffer = fs.readFileSync(TOKEN_PATH)
        oAuth2Client.setCredentials(JSON.parse(token.toString()))
        return oAuth2Client
    } catch (err) {
        return getAccessToken(oAuth2Client)
    }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
export function getAccessToken(oAuth2Client: OAuth2Client): OAuth2Client {
    console.log('getAccessToken()')

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    })

    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question('Enter the code from that page here: ', (code) => {
        rl.close()
        oAuth2Client.getToken(code, (err: GaxiosError, token: Credentials) => {
            if (err) return console.error('Error retrieving access token', err)
            oAuth2Client.setCredentials(token)

            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err)
                console.log('Token stored to', TOKEN_PATH)
            })
        })
    })
    return oAuth2Client
}
