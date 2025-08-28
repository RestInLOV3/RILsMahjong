async function createMahjongDeck() {
  // 이미 Deck이 있으면 건너뛰기
  const existing = game.cards?.filter((c) => c.name === "Mahjong Wall");
  if (existing?.length) return existing[0];

  const suits = ["m", "p", "s"];
  const honors = ["east", "south", "west", "north", "white", "green", "red"];
  const cards = [];

  // 숫자 패 1~9, 각 4장
  for (let suit of suits) {
    for (let n = 1; n <= 9; n++) {
      for (let i = 0; i < 4; i++) {
        cards.push({
          name: `${suit}${n}`,
          type: "base",
          face: 0,
          faces: [
            {
              text: "",
              img: `/systems/rils-mahjong/assets/tiles/${suit}${n}.webp`,
            },
          ],
        });
      }
    }
  }

  // 풍/삼원패, 각 4장
  for (let honor of honors) {
    for (let i = 0; i < 4; i++) {
      cards.push({
        name: honor,
        type: "base",
        face: 0,
        faces: [
          {
            text: "",
            img: `/systems/rils-mahjong/assets/tiles/${honor}.webp`,
          },
        ],
      });
    }
  }

  // Deck 생성
  const deckData = {
    name: "Mahjong Wall",
    type: "deck",
    cards: cards,
    img: "/systems/rils-mahjong/assets/tiles/back.webp",
  };

  const deck = await Cards.create(deckData);
  return deck;
}

export { createMahjongDeck };
