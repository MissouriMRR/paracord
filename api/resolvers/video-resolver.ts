import { Upload, GraphQLUpload } from 'apollo-upload-server'
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql'
import { getRepository, Repository } from 'typeorm'
import { Video } from '../entities/video'
import { createFile, listFiles, deleteFolder } from '../file_manager/file_manager'
import { Flight } from '../entities/flight'

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
        //Try running npm install if this doesn't work
        //Upload the video here
        try {
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
        } catch (err) {
            console.log(err)
        }        
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
        await deleteFolder(video.driveId)

        await this.videoRepo.delete({
            id: id,
        })
        return true
    }
}
