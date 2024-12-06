/******* 
 * @Author: yuanweihao
 * @Date: 2024-12-06 09:19:11
 * @LastEditTime: 2024-12-06 09:19:22
 * @LastEditors: yuanweihao
 * @FilePath: \realsee-template-react\src\plugins\PanoFloorplanRadarPanel.tsx
 * @Description: Do not edit
 */
import * as React from 'react'
import { unsafe__useFiveInstance, useFiveState } from '@realsee/five/react'
import { Box } from '@mui/material'
import { Five } from '@realsee/five'
// import useFetchDatas, { DATA_TYPES } from '../utils/useFetchDatas'
import type { FloorplanServerData } from '@realsee/dnalogel'
import floorplanServer from '@realsee/open-works/virtual/81gmMq5a7zbF9leWMk/floorplanServerData.json';

const PanoFloorplanRadarPanel: React.FC = () => {
  const [fiveState, setFiveState] = useFiveState()
  const floorplanServerData: FloorplanServerData = floorplanServer
  const panoFloorplanRadarPanelRef = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState<boolean>(false)
  const five = unsafe__useFiveInstance()
  const panoFloorplanRadarPlugin = five.plugins.panoFloorplanRadarPlugin
  panoFloorplanRadarPlugin.changeConfigs({ hoverEnable: true })

  React.useEffect(() => {
    if (!panoFloorplanRadarPanelRef.current || fiveState.mode !== Five.Mode.Panorama) return
    panoFloorplanRadarPlugin.appendTo(panoFloorplanRadarPanelRef.current)
  }, [five])

  React.useEffect(() => {
    if (!floorplanServerData || JSON.stringify(floorplanServerData) === '{}') return
    panoFloorplanRadarPlugin.load(floorplanServerData)
  }, [floorplanServerData, five])

  React.useEffect(() => {
    if (fiveState.mode === Five.Mode.Panorama) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [fiveState.mode])

  return (
    <Box
      onClick={() => setFiveState({ mode: Five.Mode.Floorplan })}
      sx={{
        display: `${visible ? 'flex' : 'none'}`,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '60px',
        right: '20px',
        padding: '10px',
        width: '90px',
        height: '120px',
        backgroundColor: 'rgba(0, 0, 0, .2)',
      }}
      ref={panoFloorplanRadarPanelRef}
    />
  )
}

export default PanoFloorplanRadarPanel
