import { Query, Resolver, Mutation, Arg, Int } from "type-graphql"
import { Repository, getRepository } from "typeorm"
import { Frame } from "../entities/frame"

@Resolver(() => Frame)
export class FrameResolver {
    public frameRepo: Repository<Frame> = getRepository(Frame)

    @Query(() => [Frame])
    protected async frames(): Promise<Frame[]> {
        return this.frameRepo.find()
    }

    @Mutation(() => Frame)
    protected async createFrame(
        @Arg("name", () => String)
        name: string,
    ): Promise<Frame> {
        let frame: Frame = this.frameRepo.create({
            name: name,
        })

        return frame.save()
    }

    @Mutation(() => Boolean)
    protected async deleteFrameByID(
        @Arg("id", () => Int)
        id: number,
    ): Promise<boolean> {
        await this.frameRepo.delete({
            id: id,
        })
        return true
    }
}
