import { PostType } from '../entities/model'
import { PostList } from '../widget/post'
import React from 'react'

type Props = {
  postList: PostType[]
}

export function Post({ postList }: Props) {
  return (
    <section>
      <PostList postList={postList} />
    </section>
  )
}
