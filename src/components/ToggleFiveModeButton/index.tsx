import { Five } from '@realsee/five';
import { useFiveCurrentState } from '@realsee/five/react';
import { useCallback } from 'react';
import style from './style.module.css';

export const ToggleFiveModeButton = () => {
  const [currentState, setState] = useFiveCurrentState();

  const onClick = useCallback(() => {
    if (currentState.mode === Five.Mode.Panorama) {
      setState({ mode: Five.Mode.Floorplan });
      return;
    }

    if (currentState.mode === Five.Mode.Floorplan) {
      setState({ mode: Five.Mode.Panorama });
      return;
    }
  }, [currentState.mode]);

  return (
    <button className={style.btn} onClick={onClick}>
      {currentState.mode === Five.Mode.Panorama && <span>切换到模型态</span>}
      {currentState.mode === Five.Mode.Floorplan && <span>切换到全景态</span>}
    </button>
  );
};
