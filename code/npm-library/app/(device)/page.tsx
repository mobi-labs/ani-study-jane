import { generatePost } from '@/entities/mock/data'
import { Post } from '@/view'

export const metadata = {
  title: 'App Router',
}

const mockList = generatePost(5)

export default function Page() {
  return <Post postList={mockList} />
}
