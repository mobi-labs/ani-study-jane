import { PostType } from '@/entities/model'
import { OnePost } from '@/widget/post/one-post'

type Props = {
  postList: PostType[]
}

export function PostList({ postList }: Props) {
  return (
    <div className="flex justify-center py-[18px]">
      <ul className="flex w-full flex-col items-start justify-center gap-[18px] px-5">
        {postList.map((post, index) => (
          <OnePost
            key={post.postId}
            post={post}
            isReverse={Math.random() * 10 > 5}
            isDivider={index !== postList.length - 1}
          />
        ))}
      </ul>
    </div>
  )
}
