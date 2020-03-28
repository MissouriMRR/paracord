import { Upload, GraphQLUpload } from 'apollo-upload-server'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { getRepository, Repository } from 'typeorm'
import { Video } from '../entities/video'
import { v4 as uuid } from 'uuid'
import { createWriteStream } from 'fs'
import { createFile, createFolder } from '../file_manager/file_manager'

@Resolver(() => Video)
export class VideoResolver {
    public videoRepo: Repository<Video> = getRepository(Video)

    @Mutation(() => Boolean)
    protected async uploadVideo(
        @Arg('video', () => GraphQLUpload)
        { createReadStream, filename }: Upload,
        @Arg('mimeType', () => String)
        mimeType: string,
        @Arg('name', () => String)
        name: string
    ): Promise<Boolean> {
        const id: string = uuid()

        //Try running npm install if this doesn't work
        //Upload the video here
        var folderId: string = await createFolder(
            'If this is the name then folder uploads are working'
        )
        var videoId: string = await createFile(name, mimeType, folderId, createReadStream())

        const videoInfo = this.videoRepo.create({
            id: id,
            driveId: videoId
        })
        videoInfo.save()
        
        return true
    }

    @Query(() => [Video])
    protected async videos(): Promise<Video[]> {
        return this.videoRepo.find()
    }
}
