import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Users {
    // @Prop({ unique: true })
    // username: string

    @Prop({ required: false })
    displayName?: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ required: false })
    phoneNumber?: string

    @Prop({ required: false })
    avatarUrl?: string

    @Prop({ required: true })
    password: string

    @Prop({ required: false, default: 'user' })
    role: string

    @Prop({ required: false, default: false })
    deleted: boolean
}

export const usersSchema = SchemaFactory.createForClass(Users)