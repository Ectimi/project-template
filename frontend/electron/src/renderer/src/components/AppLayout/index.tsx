import { PropsWithChildren } from 'react';
import { Header } from '../Header';

export default function AppLayout(props: PropsWithChildren<any>) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
