import React, { PropsWithChildren } from 'react';
import './tag.sass';

type Props = {
  color?: 'Grey' | 'Red' | 'Green' | 'Blue' | 'Default';
  rectangle?: 'circle' | 'square';
};

export function Tag({ children, rectangle = 'circle', color = 'Default', ...props }: PropsWithChildren<Props>) {
  const tagClass = `tag tag--color-${color.toLowerCase()} tag--rectangle-${rectangle}`;

  return (
    <div className={'text-caption4 ' + tagClass} {...props}>
      {children}
    </div>
  );
}
