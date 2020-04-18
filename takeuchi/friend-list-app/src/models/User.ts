export class User {

  name: string
  favorite: string

  constructor(name: string, favorite: string) {
    this.name = name
    this.favorite = favorite
  }

  public static setUsers(firebaseResponse: any): User[] {

    let users: User[] = []

    for (const item of firebaseResponse) {
      const name = item.fields.name.stringValue
      const favorite = item.fields.favorite.stringValue
      users.push(new User(name, favorite))
    }

    return users
  }

}

