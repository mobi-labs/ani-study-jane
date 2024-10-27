import React from 'react';
import './divider.sass';

type Props = {
  width?: 'default' | 'full';
  thickness?: 'default' | 'bolder';
};

export function Divider({ thickness = 'default', width = 'default', ...props }: Props) {
  const dividerClass = `divider divider--${width}-width divider--${thickness}-thickness`;

  return <div className={dividerClass} {...props} />;
}
