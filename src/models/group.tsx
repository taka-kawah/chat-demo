interface IGroup{
    Id: string
    Name: string
    CreatedAt: Date
    Member: string[]
}

export default class Group implements IGroup{
    readonly Id: string
    readonly Name: string
    readonly CreatedAt: Date
    Member: string[]

    constructor(id:string, data:any){
        this.Id = id
        this.Name = data.name
        this.CreatedAt = new Date(data.CreatedAt)
        this.Member = data.member
    }
}