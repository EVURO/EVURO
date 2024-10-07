import { ReactNode } from 'react';
import { useAppSelector } from '@evuro-frontend/store';
import { Alert, ScreenLoader } from '../components';
import React from 'react';

interface BrainBoxProps {
  children: ReactNode;
}

const BrainBox = ({ children }: BrainBoxProps) => {
  const alert = useAppSelector((state) => state.user.alert);
  const screenLoader = useAppSelector((state) => state.screenLoader.loader);

  return (
    <div>
      {children}
      {alert?.visible && (
        <Alert variant={alert.variant} message={alert.message} />
      )}
      {screenLoader && <ScreenLoader />}
    </div>
  );
};

export default BrainBox;
