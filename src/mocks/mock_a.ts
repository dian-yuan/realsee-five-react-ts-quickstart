/*
 * @Author: yuanweihao
 * @Date: 2024-12-06 09:51:46
 * @LastEditTime: 2024-12-09 16:32:49
 * @LastEditors: yuanweihao
 * @FilePath: \realsee-template-react\src\mocks\mock_a.ts
 * @Description: Do not edit
 */
import { Tag } from '@realsee/dnalogel'
import { ContentType } from '@realsee/dnalogel/dist'
import { Mode } from '@realsee/five'
import { Vector3 } from 'three'
export const TagsList: Tag[] = [
  {
    dimensionType: '3D',
    pointType: 'PlaneTag',
    contentType: 'MediaPlane',
    enabled: true,
    fiveState: {
      mode: 'Panorama' as Mode,
      panoIndex: 0,
    },
    position: [
      [
        -2.064769142525731,
        -0.5512338905922599,
        -3.5232847863974137
      ],
      [
        -2.0570771859209867,
        -0.5857201884063522,
        -0.9753161384271807
      ],
      [
        -2.052774824748858,
        0.958604750854481,
        -0.9544269660882487
    ],
    [
        -2.0604667813536017,
        0.9930910486685733,
        -3.502395614058482
    ]
  ],
    data: {
      mediaData: [
        {
          url: 'http://vr-static.realsee-cdn.cn/release/web/catCoding.1cd4e989.gif',
          // url: 'http://vr-static.realsee-cdn.cn/release/web/jsl/test.65720b34.png',
          type: 'Image',
        },
        {
          url: 'http://vr-static.realsee-cdn.cn/release/web/catCoding.1cd4e989.gif',
          type: 'Image',
        },
      ],
    },
  },
]