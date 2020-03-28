import { Readable } from 'stream'
import { Field } from 'type-graphql'

export class File {
    @Field(() => Readable)
    createReadStream: () => Readable

    @Field()
    filename: string

    @Field()
    mimetype: string

    @Field()
    encoding: string
}
