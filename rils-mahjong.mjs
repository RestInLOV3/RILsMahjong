import { CharacterData } from "./data/playerdata.mjs";
import { createMahjongDeck } from "./data/tiledata.mjs";
import "./scripts/match.mjs";

//시작할 때
Hooks.once("init", () => {
  // 액터 데이터 모델 등록
  CONFIG.Actor.dataModels.character = CharacterData;

  // track할 수 있는 속성 정의
  CONFIG.Actor.trackedAttributes = ["riichi", "score", "seat"];
});

// 준비되면
Hooks.once("ready", async () => {
  const deck = await createMahjongDeck();
  console.log("Mahjong deck ready:", deck);
});
