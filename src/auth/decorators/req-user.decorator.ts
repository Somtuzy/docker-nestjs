import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    
    console.log({ requestUser: data ? user[data] : user });
    return data ? user[data] : user
})