import { PostType } from '@/entities/model';
import { OnePost } from '@/widget/post/one-post';
import React from 'react';
import './post-list.sass';

type Props = {
  postList: PostType[]
}

export function PostList({ postList }: Props) {
  return (
    <div className="post-list-container">
      <ul>
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
  );
}
