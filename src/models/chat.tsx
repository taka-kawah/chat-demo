interface IChat{
    Id: string,
    CreatedAt: Date,
    Message: string,
    GroupId: string,
    PostedBy: string
}

export default class Chat implements IChat{
    readonly Id: string
    readonly CreatedAt: Date
    Message: string
    readonly GroupId: string
    readonly PostedBy: string

    constructor(id:string, data:any){
        this.Id = id
        this.CreatedAt = data.CreatedAt.toDate()
        this.Message = data.Message
        this.GroupId = data.GroupId
        this.PostedBy = data.PostedBy
    }
}