interface IUser{
    Id: string,
    Name: string
}

export class User implements IUser{
    readonly Id: string
    readonly Name: string

    constructor(id: string, data: any){
        this.Id = id
        this.Name = data.name
    }
}