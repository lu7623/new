import { FC } from 'react';

export interface MessageProps {
  success: boolean;
  message: string;
  visible: boolean;
}

export const UserMessage: FC<MessageProps> = ({ success, message, visible }) => {
  const styled = success ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  return <p className={visible ? `${styled}` : 'hidden'}>{message}</p>;
};
