import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { UserRoles } from '../enums/user-roles.enum';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})
export class User {
    @Transform((value) => value.toString())
    _id: string;

    @Prop({
        required: true,
    })
    firstname: string;

    @Prop({
        required: true,
    })
    lastname: string;

    @Prop({
        required: true,
        unique: true,
    })
    phone: string;

    @Prop()
    email: string;

    @Prop({
        required: true,
    })
    @Exclude()
    password: string;

    @Prop()
    @Exclude()
    salt: string;

    @Prop({
        type: String,
        enum: UserRoles,
        default: UserRoles.USER,
    })
    @Exclude()
    role: string;

    @Prop({
        default: false,
    })
    receive_newsletter: boolean;

    @Prop()
    subscriptions: string[];

    @Prop({
        default: false,
    })
    verified: boolean;

    @Prop()
    avatar: string;

    @Prop()
    verification_code: number;

    validatePassword: Function;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (password: string) {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
};
export { UserSchema };
