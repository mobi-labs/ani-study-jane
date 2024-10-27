import React from 'react'
import { generatePost } from '../../src/entities/mock/data'
import { Post } from '../../src/view'

export const metadata = {
  title: 'App Router',
}

const mockList = generatePost(5)

export default function Page() {
  return <Post postList={mockList} />
}
