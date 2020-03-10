import * as fileType from "file-type"
import { GraphQLUpload } from "graphql-upload"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { getRepository, Repository } from "typeorm"
import { Video } from "../entities/video"
import { File } from "../entities/file"
import { v4 as uuid } from "uuid"

@Resolver(() => Video)
export class VideoResolver {
    public videoRepo: Repository<Video> = getRepository(Video);

    @Mutation(() => Video)
    protected async uploadVideo(
        @Arg("video", ()=> GraphQLUpload) video: File
    ): Promise<Video> {

        const id: string = uuid()
        const filename: string = `${id}.pdf`
        const url: string = "put/upload/link/here"
        
        //Upload the video here

        const videoInfo = this.videoRepo.create({
            id: id,
            url: url
        })

        return videoInfo.save()
    }

    @Query(() => [Video])
    protected async videos(): Promise<Video[]> {
      return this.videoRepo.find()
    }
}