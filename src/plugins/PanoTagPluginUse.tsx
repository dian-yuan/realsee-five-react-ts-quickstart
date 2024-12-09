/******* 
 * @Author: yuanweihao
 * @Date: 2024-12-05 16:53:31
 * @LastEditTime: 2024-12-09 16:16:12
 * @LastEditors: yuanweihao
 * @FilePath: \realsee-template-react\src\plugins\PanoTagPluginUse.tsx
 * @Description: 标签use
 */
import { useEffect, useState } from 'react'
import { unsafe__useFiveInstance, useFiveEventCallback, useFiveState } from '@realsee/five/react'
import { Five, Mode } from '@realsee/five'
import { TagsList } from '../mocks/mock_a.ts'
import TagsList6 from '../mocks/crash/maxTest.ts'
import TagsList3 from '../mocks/mediaModel.ts'
import TagsList2 from '../mocks/marketingData.ts'
import TagsList4 from '../mocks/textTagData.ts'
import TagsList5 from '../mocks/mjyygrw5.ts'
import TagsList7 from '../mocks/qingxiesheying.ts'
import TagsListCrash from '../mocks/crash/tag.json'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { PanoTagPluginExportInterface } from '@realsee/dnalogel/dist'
import {Raycaster,Vector2} from 'three'
// import { FiveModeSwitcher } from '../components/FiveModeSwitcher.tsx'

const PanoTagPluginUse = () => {
  const five = unsafe__useFiveInstance()
  const [visible, setVisible] = useState(true)
  const [enabled, setEnabled] = useState(true)
  const pluginInstance = five.plugins.panoTagPlugin as PanoTagPluginExportInterface

  const loadData0 = () => {
    const list = TagsList.map((v, i) => ({ ...v, id: i })) as any
    pluginInstance.load({
      tagList: list,
      globalConfig: {
        renderType: 'Mesh',
        // simulate3D: true,
        // visibleConfig: {
        //   entryFromModel: true,
        // },
      },
    })
    pluginInstance.enable()
    pluginInstance.show()
  }

  const loadData1 = () => {
    const list = TagsList6.map((v, i) => ({ ...v, id: i })) as any
    pluginInstance.load({ tagList: list })
  }

  const loadData2 = () => {
    const list = TagsList3.map((v, i) => ({ ...v, id: i })) as any
    pluginInstance.load({
      tagList: list,
      globalConfig: {
        renderType: 'Dom',
      },
    })
  }

  // const raycaster = new Raycaster();
  // const mouse = new Vector2();
  // function onMouseClick(event) {
  //   // 将鼠标点击位置转换为标准化设备坐标 (NDC)
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  //   // 更新射线投射器以匹配相机和鼠标位置
  //   raycaster.setFromCamera(mouse, pluginInstance.five.camera);
  
  //   // 计算所有与射线相交的对象
  //   const intersects = raycaster.intersectObjects(pluginInstance.five.scene.children, true); // true 表示递归查找子对象
  
  //   if (intersects.length > 0) {
  //      // 获取第一个被击中的对象及其点击点的世界坐标
  //   const hitObject = intersects[0].object;
  //   const point = intersects[0].point;

  //   // console.log('Hit object:', hitObject);
  //   console.log('World coordinates of the hit point:', point);

  //   // 如果需要局部坐标，可以这样做：
  //   // const localPoint = hitObject.worldToLocal(point.clone());
  //   // console.log('Local coordinates of the hit point:', localPoint);

  //   // // 打印出具体的 x, y, z 坐标值
  //   // console.log(`World X: ${point.x.toFixed(2)}, Y: ${point.y.toFixed(2)}, Z: ${point.z.toFixed(2)}`);
  //   // console.log(`Local X: ${localPoint.x.toFixed(2)}, Y: ${localPoint.y.toFixed(2)}, Z: ${localPoint.z.toFixed(2)}`);
  //   } else {
  //     console.log('Nothing clicked');
  //   }
  // }
  // window.addEventListener('click', onMouseClick, false);
  
  useEffect(() => {
    loadData0()
    return () =>{
      pluginInstance.dispose()
    } 
  },[five])

  const handlerTagVisibleChange = async () => {
    if (visible) {
      await pluginInstance.hide()
    } else {
      await pluginInstance.show()
    }
    setVisible(!visible)
  }

  const handlerTagEnableChange = async () => {
    if (enabled) {
      pluginInstance.disable()
    } else {
      pluginInstance.enable()
    }
    setEnabled(!enabled)
  }

  return (
    <>
      {/* <FiveModeSwitcher modeList={['Mapview', 'Panorama']} /> */}
      <Stack direction={'column'} spacing={1} sx={{ position: 'fixed', top: '10px', right: '10px' }}>
        <Stack direction={'row'} spacing={1} justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => loadData0()}>
            加载数据0
          </Button>
          <Button variant="contained" size="small" onClick={() => loadData1()}>
            加载大量数据
          </Button>
          <Button variant="contained" size="small" onClick={() => loadData2()}>
            加载视频标签
          </Button>
        </Stack>
        <Stack direction={'row'} spacing={1} justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => handlerTagVisibleChange()}>
            {visible ? '隐藏' : '显示'}标签
          </Button>
          <Button variant="contained" size="small" onClick={() => handlerTagEnableChange()}>
            {enabled ? '禁用' : '启用'}标签
          </Button>
          <Button variant="contained" size="small" onClick={() => pluginInstance.dispose()}>
            dispose
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export default PanoTagPluginUse
