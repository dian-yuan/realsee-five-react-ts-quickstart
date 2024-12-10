// import workJSON from '@realsee/open-works/virtual/81gmMq5a7zbF9leWMk/work.json';
import workJSON from './works.json'
import { createFiveProvider } from '@realsee/five/react';
import { ResponsiveFiveCanvas } from './components/ResponsiveFiveCanvas';
import { FivePluginInit, parseWork } from '@realsee/five'
import { ToggleFiveModeButton } from './components/ToggleFiveModeButton';
import { PanoFloorplanRadarPlugin, PanoTagPlugin,Sculpt,ModelViewPlugin } from '@realsee/dnalogel';
import { OrientationPlugin } from '@realsee/five/plugins'

import "./vreo/defult.css";

import MiniModelPanel from './plugins/MiniModelPanel';
import PanoFloorplanRadarPanel from './plugins/PanoFloorplanRadarPanel'
import PanoTagPluginUse from './plugins/PanoTagPluginUse';
import { VreoPlayer } from './vreo/veroPlayer';
import request from './utils/request'
import { setToken } from './utils/auth';
import Use from './plugins/Sculpt/Use'

// five初始化参数请参考

// https://unpkg.com/@realsee/five@latest/docs/interfaces/five.FiveInitArgs.html

// // 初始化鉴权
// function author(){
//    request('/dev-api/auth/access_token',{
//     method: 'POST',
//     isToken:false,
//     body: JSON.stringify({
//       app_key:'2708611',
//       app_secret:'833INYBW1AWY9YINNUYVVBHEJBSPTDII'
//     }),
//   }).then(res => {
//     setToken(res.data.access_token)
//     getBasicData(res.data.access_token)
//   })
// }

// author()



// function getBasicData(header){
//   return request('/dev-api/open/v1/entity/floorplan',{
//     method: 'GET',
//     params: {
//       vr_code:'4oM61gXy4rFY0V6f3D',
//     },
//     headers:{"Authorization":header}
//   }).then(res=> {
//     console.log(res);
//   })
// }

// function getBasicData(header){
//   return request('/dev-api/open/v3/vr/info',{
//     method: 'GET',
//     params: {
//       resource_code:'4oM61gXy4rFY0V6f3D',
//     },
//     headers:{"Authorization":header}
//   }).then(res=> {
//     console.log(res);
//   })
// }

const lineWidth = 1.5
const lineOpacity = 0.8

const FiveProvider = createFiveProvider({
  imageOptions: {
    // 初始512开启动态瓦片加载，可提升点位加载速度
    size: 512,
  },
  textureOptions: {
    // 关闭模型贴图自动缩放，加载高精度模型贴图，
    // 注意，低性能的机器大模型场景容易崩溃
    autoResize: false,
  },
  plugins: [
    // [PanoFloorplanRadarPlugin, 'panoFloorplanRadarPlugin'],
    [PanoTagPlugin, 'panoTagPlugin', { debug: false }] as FivePluginInit<typeof PanoTagPlugin> ,
    [OrientationPlugin, 'OrientationPlugin'],
    [ModelViewPlugin,'modelViewPlugin'],
    [
      (five) =>
        new Sculpt(five, {
          point: { color: 0xffffff },
          line: { lineColor: 0xffffff, lineWidth },
          polyline: { lineColor: 0x000000, lineWidth },
          polygon: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
          prism: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
          rectangle: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
          circle: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
          cylinder: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
          box: { color: 0xffffff, lineColor: 0x000000, lineWidth, lineOpacity },
        }),
      'Sculpt',
    ],
  ],
  poweredByRealsee:false
});

function App() {
  return (
    workJSON && (
      <FiveProvider 
        initialWork={parseWork(workJSON)}
        initialOptions={{
          '3d-tiles': {
            minLevelOfDetail: 1,
            maxScreenSpaceError: 1,
          },
        }}
        initialState={{ mode: 'Mapview', latitude: 0.78, longitude: 2 }}
        >
        {/* 基础resize */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <ResponsiveFiveCanvas />
        </div>
        {/* <ToggleFiveModeButton/> */}
        {/* 小地图 */}
        {/* <PanoFloorplanRadarPanel/> */}
        {/* 标签tag */}
        {/* <VreoPlayer/> */}
        {/* <PanoTagPluginUse/> */}
        {/* <Use/> */}
        <MiniModelPanel/>
      </FiveProvider>
    )
  )
}

export default App;
