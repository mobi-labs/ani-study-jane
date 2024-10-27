import { ChatOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import { PostType } from '../../entities/model';
import { Divider, Tag } from '../../share/ui';
import React from 'react';
import './one-post.sass';
import classNames from 'classnames';

type Props = {
  post: PostType;
  isDivider: boolean;
  isReverse?: boolean;
};

export function OnePost({ post, isDivider, isReverse = false }: Props) {
  const { title, subTitle, tags, like_count, comment_count, img_url } = post;
  const reverseItem = img_url && isReverse;

  return (
    <li className="one-post">
      <div className={classNames('one-post__content', { 'one-post__content--reverse': reverseItem })}>
        <div className={classNames('one-post__text', { 'one-post__text--reverse': reverseItem })}>
          <div className="one-post__text__tags">
            {tags.map(tag => (
              <Tag key={tag.id} rectangle="square" color={tag.color}>
                {tag.name}
              </Tag>
            ))}
          </div>
          <div className="one-post__text__title">{title}</div>
          <div className="one-post__text__subtitle">{subTitle}</div>
          <div className="one-post__info">
            <div className="one-post__info__like">
              <FavoriteBorderOutlined className="icon" />
              <div className="count">{like_count}</div>
            </div>
            <div className="one-post__info__comments">
              <ChatOutlined className="icon" />
              <div className="count">{comment_count}</div>
            </div>
          </div>
        </div>
        {img_url && (
          <div className="one-post__image">
            <div className="image-placeholder" />
          </div>
        )}
      </div>
      {isDivider && <Divider thickness="default" width="full" />}
    </li>
  );
}
