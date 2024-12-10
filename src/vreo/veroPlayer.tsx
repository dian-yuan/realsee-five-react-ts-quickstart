/******* 
 * @Author: yuanweihao
 * @Date: 2024-12-10 09:24:16
 * @LastEditTime: 2024-12-10 14:39:53
 * @LastEditors: yuanweihao
 * @FilePath: \realsee-template-react\src\vreo\veroPlayer.tsx
 * @Description: Do not edit
 */
import { unsafe__useFiveInstance } from "@realsee/five/react";
import { Player } from "@realsee/vreo";
import { VreoKeyframeEnum } from "@realsee/vreo/lib/typings/VreoUnit";
import { useEffect, useState } from 'react'

import {
  CameraMovementData,
  PanoTagData,
  ModelVideoData,
  VideoEffectData
} from "./data";

const funcList = [
  { id: "camera_movement", name: "相机运镜", data: CameraMovementData },
  { id: "pano_tag", name: "全景标签", data: PanoTagData },
  { id: "model_video", name: "视频投放", data: ModelVideoData },
  { id: "video_effect", name: "视频特效", data: VideoEffectData }
];

enum PlayerState {
  notReady = "notReady",
  ready = "ready", // new Player() 即 ready
  paused = "paused",
  playing = "playing"
}

export function VreoPlayer() {
  let vreoPlayerRef:Player;
  const five = unsafe__useFiveInstance();
  
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.ready
  );

  useEffect(() => {
    if (vreoPlayerRef) return;
    const player = new Player(five);
    console.log(player);
    vreoPlayerRef = player;
    setPlayerState(PlayerState.ready);
    player.on("paused", () => setPlayerState(PlayerState.paused));
    player.on("playing", () => setPlayerState(PlayerState.playing));
    player.on(VreoKeyframeEnum.Exit, () => {
      console.log("结束");
    });
  }, [five]);

  const handleVreoFunction = (value: any, e: any) => {
    console.log(value);
    
    if (!vreoPlayerRef) return;
    vreoPlayerRef.load(value, 0, false, true);
  };

  const handlePause = () => {
    if (!vreoPlayerRef) return;
    vreoPlayerRef.pause();
  };

  return (
    <div className="btns">
      {playerState !== PlayerState.playing &&
        funcList.map((item) => {
          const vreoData = item.data;
          return (
            <button
              key={item.id}
              onClick={(e) => handleVreoFunction(vreoData, e)}
            >
              {item.name}
            </button>
          );
        })}
      {playerState === PlayerState.playing && (
        <button onClick={handlePause}>暂停</button>
      )}
    </div>
  );
}
