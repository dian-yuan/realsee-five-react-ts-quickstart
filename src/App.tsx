import workJSON from '@realsee/open-works/virtual/81RojBlJQdVTglNNMr/work.json';
import { createFiveProvider } from '@realsee/five/react';
import { ResponsiveFiveCanvas } from './components/ResponsiveFiveCanvas';
import { ToggleFiveModeButton } from './components/ToggleFiveModeButton';
import { parseWork } from '@realsee/five'

// five初始化参数请参考
// https://unpkg.com/@realsee/five@latest/docs/interfaces/five.FiveInitArgs.html
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
});

function App() {
  return (
    workJSON && (
      <FiveProvider initialWork={parseWork(workJSON)}>
        <ResponsiveFiveCanvas />
        <ToggleFiveModeButton />
      </FiveProvider>
    )
  )
}

export default App;
