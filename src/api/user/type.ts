export interface Profile {
  gender: number
  address: string
  photo: string
}

export interface RoleItem {
  id: number
  name: string
}

export interface UserItem {
  id?: number
  username: string
  password: string
  roles: RoleItem[]
  profile: Profile
}
