// scripts/match.mjs
// 대국 전체 흐름 관리 모듈

// 1️⃣ 파일 로드 확인
Hooks.once("ready", () => {
  console.log("match.mjs 파일 로딩됨");
});

// 2️⃣ 전투 시작 시 대국 로직 실행
Hooks.on("combatStart", async (combat) => {
  console.log("대국 시작 이벤트 감지");

  const combatActors = combat.combatants.map((c) => c.actor).filter((a) => a);

  if (combatActors.length !== 4) {
    ui.notifications.warn("대국을 시작하려면 4명의 참여자가 필요합니다.");
    await combat.delete();
    return;
  }

  // 참여자 랜덤화 후 동남서북 배정
  const shuffled = shuffle(combatActors);
  const directions = ["E", "S", "W", "N"];
  const priorities = { E: 4, S: 3, W: 2, N: 1 };

  const tablePositions = shuffled.reduce((acc, actor, i) => {
    const dir = directions[i % directions.length]; // 혹시 4명 이상이면 나눠줌
    acc[actor.id] = { actor, direction: dir, priority: priorities[dir] };
    return acc;
  }, {});

  // combat.turns 배열에서 combatant 객체와 actor 연결
  const combatantPriority = combat.combatants.map((c) => ({
    combatant: c,
    priority: tablePositions[c.actor?.id]?.priority || 0,
  }));

  // 우선권 순으로 정렬 (높은 우선권이 먼저)
  combatantPriority.sort((a, b) => b.priority - a.priority);

  // combatants의 initiative를 갱신
  for (const cp of combatantPriority) {
    await cp.combatant.update({ initiative: cp.priority });
  }

  console.log(
    "최종 턴 순서(우선권 기반):",
    combat.turns.map((c) => `${c.actor?.name} (${c.initiative})`)
  );

  // TODO: 패산 초기화하기

  // TODO: 플레이어 손패 초기화하기 (없으면 만들기)

  // TODO: 플레이어 배패 나눠주기 (13개)
});

// 대국 중 처리
// TODO: 턴을 임의로 넘길 수 없음

// TODO: 자신의 턴이 시작될 때, 패를 뽑아옴

// TODO: 패를 버리면, 다음 사람 턴으로 넘어감
