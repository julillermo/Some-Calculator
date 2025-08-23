import { ReactNode } from 'react';
import { flexContainer } from './AppContainer.css';

type AppContainerProps = {
  children: ReactNode;
};

export const AppContainer = ({ children }: AppContainerProps): ReactNode => {
  return <div className={flexContainer}>{children}</div>;
};
