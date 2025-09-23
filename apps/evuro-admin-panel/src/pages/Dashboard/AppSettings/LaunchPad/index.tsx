import React, { useState } from 'react';
import AddLaunchPad from './AddLaunchPad';
import GetLaunchPad from './GetLaunchPad';
import { useLaunchPad } from '@evuro-frontend/hooks';
const LaunchPad = () => {
  const { getLaunchPad } = useLaunchPad();
  const [launchPad, setLaunchPad] = useState(false);
  return (
    <div className="h-auto overflow-y-auto">
      {!launchPad && getLaunchPad?.status === 200 ? (
        <GetLaunchPad getLaunchPad={getLaunchPad} setLaunchPad={setLaunchPad} />
      ) : (
        <AddLaunchPad
          getLaunchPad={getLaunchPad}
          showLaunchPad={setLaunchPad}
        />
      )}
    </div>
  );
};

export default LaunchPad;
