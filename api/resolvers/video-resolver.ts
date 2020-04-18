import { Upload, GraphQLUpload } from 'apollo-upload-server'
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql'
import { getRepository, Repository } from 'typeorm'
import { Video } from '../entities/video'
import { createFile, listFiles, deleteFile } from '../file_manager/file_manager'
import { Flight } from '../entities/flight'

const videoMimeTypes: string[] = ["video/3gpp", "video/mp4", "video/mpeg", "video/ogg", "video/quicktime", "video/webm", "video/x-m4v", "video/ms-asf", "video/x-ms-wmv", "video/x-msvideo"]

@Resolver(() => Video)
export class VideoResolver {
    public videoRepo: Repository<Video> = getRepository(Video)
    public flightRepo: Repository<Flight> = getRepository(Flight)

    @Mutation(() => Video)
    protected async uploadVideo(
        @Arg('video', () => GraphQLUpload)
        { createReadStream, filename, mimetype }: Upload,
        @Arg('flightId', () => Int)
        flightId: number,
    ): Promise<Video> {
        //Make sure video is a video
        if(!videoMimeTypes.includes(mimetype)) {
            throw new Error(
                'File mime type not recognized as a video.'
            )
        }

        //Try running npm install if this doesn't work
        //Upload the video here
        let flight: Flight = await this.flightRepo.findOneOrFail({
            id: flightId,
        })
        let flightDriveId: string = flight.driveId

        var videoId: string = await createFile(filename, mimetype, flightDriveId, createReadStream())
        const video: Video = this.videoRepo.create({
            driveId: videoId
        })
        video.flight = flight
        
        return video.save()
    }

    @Query(() => [Video])
    protected async videos(): Promise<Video[]> {
        await listFiles()
        return this.videoRepo.find()
    }

    @Mutation(() => Boolean)
    protected async deleteVideoByID(
        @Arg('id', () => Int)
        id: number
    ): Promise<boolean> {
        let video: Video = await this.videoRepo.findOneOrFail({
            id: id,
        })
        await deleteFile(video.driveId)

        await this.videoRepo.delete({
            id: id,
        })
        return true
    }
}
