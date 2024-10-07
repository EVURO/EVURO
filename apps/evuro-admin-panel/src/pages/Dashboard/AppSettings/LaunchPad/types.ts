export type getLaunchPadType = {
  status: number;
  data: Record<string, any>[];
};
export interface getLaunchPadProps {
  getLaunchPad: getLaunchPadType;
  setLaunchPad: (launchPad: boolean) => void;
}

export interface addLaunchPadProps {
  getLaunchPad: getLaunchPadType;
  showLaunchPad: (launchPad: boolean) => void;
}
