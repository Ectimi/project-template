import React from 'react';
import classNames from 'classnames';
import './index.less';

interface IProps {
  className: string;
}

function Loading(props: IProps) {
  const { className } = props;
  return (
    <div className={classNames('Spinner', className)}>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

export default Loading;
