import { Upload, GraphQLUpload } from "apollo-upload-server"
import { Arg, Mutation, Query, Resolver } from "type-graphql"
import { getRepository, Repository } from "typeorm"
import { Video } from "../entities/video"
import { v4 as uuid } from "uuid"
import { createWriteStream } from "fs"

@Resolver(() => Video)
export class VideoResolver {
    public videoRepo: Repository<Video> = getRepository(Video)

    @Mutation(() => Boolean)
    protected async uploadVideo(
        @Arg("video", ()=> GraphQLUpload)
        {
            createReadStream,
            filename
        }: Upload
    ): Promise<Boolean> {

        const id: string = uuid()
        const url: string = "put/upload/link/here"
        
        const videoInfo = this.videoRepo.create({
            id: id,
            url: url
        })
        videoInfo.save()

        //Try running npm install if this doesn't work
        //Upload the video here, for now server saves video file locally
        return new Promise(async (resolve, reject) =>
            createReadStream()
            .pipe(createWriteStream(__dirname + `/../files/${filename}`))
            .on("finish", () => resolve(true))
            .on("error", () => reject(false))
        )
    }

    @Query(() => [Video])
    protected async videos(): Promise<Video[]> {
      return this.videoRepo.find()
    }
}