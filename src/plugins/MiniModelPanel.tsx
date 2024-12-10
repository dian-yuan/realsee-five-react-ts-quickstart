/******* 
 * @Author: yuanweihao
 * @Date: 2024-12-10 17:13:47
 * @LastEditTime: 2024-12-10 17:32:09
 * @LastEditors: yuanweihao
 * @FilePath: \realsee-template-react\src\plugins\MiniModelPanel.tsx
 * @Description: Do not edit
 */
import * as React from 'react'
import { unsafe__useFiveInstance, useFiveModelReadyState, useFiveState } from '@realsee/five/react'
import { Box} from '@mui/material'
import { Five } from '@realsee/five'
import type { ModelViewPlugin } from '@realsee/dnalogel'

const MiniModelPanel: React.FC = () => {
  const [fiveState, setFiveState] = useFiveState()
  const five = unsafe__useFiveInstance()
  const miniModeRef = React.useRef<HTMLDivElement>(null)
  const fiveModeReadyState = useFiveModelReadyState()

  const plugin = five.plugins.modelViewPlugin as ReturnType<typeof ModelViewPlugin>

  React.useEffect(() => {
    if (!miniModeRef.current || fiveState.mode !== Five.Mode.Panorama) return
    five.plugins.modelViewPlugin.appendTo(miniModeRef.current)
  }, [fiveState.mode, fiveModeReadyState, five])

  React.useEffect(() => {
    const config: Parameters<(typeof plugin)['changeConfigs']>[0] = {
      lookAtCurrentCamera: false,
      lockedLatitude: null,
      lockedLongitude: null,
    }
    plugin.changeConfigs(config)
  }, [five])

  if (fiveState.mode !== Five.Mode.Panorama) return null
  if (fiveModeReadyState !== 'Loaded') return null
  return (
    <>
      {/* <FormGroup sx={{ position: 'absolute', left: '20px', top: '20px', width: '200px' }}>
        <FormControlLabel
          control={<Switch checked={checkedState.latitude} name="latitude" onChange={handleCheckChange} />}
          label="锁定俯仰角"
        />
        <Slider
          value={lockedLatitude}
          disabled={!checkedState.latitude}
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
          scale={calculateLatitude}
          onChange={handleLatitudeSliderChange}
        />
        <FormControlLabel
          control={<Switch checked={checkedState.longitude} name="longitude" onChange={handleCheckChange} />}
          label="锁定水平角"
        />
        <Slider
          value={lockedLongitude}
          disabled={!checkedState.longitude}
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
          scale={calculateLongitude}
          onChange={handleLongitudeSliderChange}
        />
        <FormControlLabel
          control={<Switch name="currentPanoIndex" checked={checkedState.currentPanoIndex} onChange={handleCheckChange} />}
          label="锁定当前点位"
        />
      </FormGroup> */}
      <Box
        onClick={() => setFiveState({ mode: 'Floorplan' })}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '60px',
          right: '20px',
          padding: '10px', // 注意: 插件内部无法获知 padding 值，如有需要，请务必传入 size
          width: '200px',
          height: '200px',
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, .2)',
          pointerEvents: 'all',
        }}
        ref={miniModeRef}
      />
    </>
  )
}

export default MiniModelPanel
