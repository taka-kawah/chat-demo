interface IGroup{
    Id: string
    CreatedAt: Date
    Member: string[]
}

export default class Group implements IGroup{
    readonly Id: string
    readonly CreatedAt: Date
    Member: string[]

    constructor(id:string, data:any){
        this.Id = id
        this.CreatedAt = data.CreatedAt.toDate()
        this.Member = data.Member
    }
}