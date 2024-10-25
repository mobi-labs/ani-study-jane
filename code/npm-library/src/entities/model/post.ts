export type ColorType = 'Default' | 'Red' | 'Green' | 'Blue' | 'Grey'

export type TagType = {
  id: number
  name: string
  color: ColorType
}
export type PostType = {
  postId: number
  tags: TagType[]
  title: string
  subTitle: string
  like_count: number
  comment_count: number
  img_url?: string
}
