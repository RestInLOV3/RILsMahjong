import { CharacterData } from "./data/playerdata.js";

Hooks.once("init", () => {
  // 액터 데이터 모델 등록
  CONFIG.Actor.dataModels.character = CharacterData;

  // track할 수 있는 속성 정의
  CONFIG.Actor.trackedAttributes = ["riichi", "score", "seat"];
});
