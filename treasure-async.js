// ============================================================
// 实验二：JavaScript 异步之寻宝 —— async/await 版（Node 可运行）
// 新增情节：
//   1. crossMistyForest   穿越迷雾森林（随机迷路，重新找路）
//   2. crossRiverByBoat   等待老船夫渡河（异步等待资源）
//   3. challengeGuard     与神庙守卫猜拳定胜负（失败可重试三次）
//   4. openTreasureBox    宝箱铜/银/金三道锁依次开启
// 运行：node treasure-async.js
// ============================================================

// 统一的异步等待工具
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟宝藏地图 API（全部方法返回 Promise，用 async 定义）
class TreasureMap {
  // 第 1 站：古老图书馆找线索
  static async getInitialClue() {
    await sleep(1000);
    return '在古老的图书馆里找到了第一个线索...';
  }

  // 第 2 站：解码古老经文
  static async decodeAncientScript(clue) {
    await sleep(1500);
    if (!clue) {
      throw new Error('没有线索可以解码!');
    }
    return '解码成功!宝藏在一座古老的神庙中...';
  }

  // 第 3 站（新增）：穿越迷雾森林，35% 概率迷路，重新找路后继续
  static async crossMistyForest() {
    await sleep(1200);
    if (Math.random() < 0.35) {
      await sleep(900);
      return '迷雾中一度迷路，你顺着指南针重新找到了小径...';
    }
    return '穿过迷雾森林，发现一条通往深山的隐秘小径...';
  }

  // 第 4 站（新增）：等待老船夫撑船靠岸，渡过急流
  static async crossRiverByBoat() {
    await sleep(1500);
    return '老船夫撑着木船靠岸，你渡过了湍急的河流...';
  }

  // 第 5 站：搜寻神庙，50% 概率撞见守卫（reject -> throw）
  static async searchTemple() {
    await sleep(2000);
    if (Math.random() < 0.5) {
      throw new Error('糟糕!遇到了神庙守卫!');
    }
    return '神庙里空无一人，你径直找到了一个神秘的箱子...';
  }

  // 第 6 站（新增）：与守卫猜拳，赢一局即通过；平局重赛；输三局则失败
  static async challengeGuard() {
    const moves = ['石头', '剪刀', '布'];
    // 克制关系：key 克制 value
    const beats = { 石头: '剪刀', 剪刀: '布', 布: '石头' };
    let round = 1;
    while (round <= 3) {
      await sleep(800);
      const player = moves[Math.floor(Math.random() * 3)];
      const guard = moves[Math.floor(Math.random() * 3)];
      console.log(`  第${round}回合：你出「${player}」，守卫出「${guard}」`);
      if (player === guard) {
        await sleep(400);
        console.log('  平局，本回合重赛...');
        continue; // 平局不消耗回合
      }
      if (beats[player] === guard) {
        return `第${round}回合猜拳获胜，守卫拱手让路，你进入了神庙深处...`;
      }
      console.log('  本回合失利...');
      round++;
    }
    throw new Error('三次猜拳均告失利，守卫把你请下了神山...');
  }

  // 第 7 站：铜、银、金三道锁依次打开，宝箱现世
  static async openTreasureBox() {
    for (const lockName of ['铜锁', '银锁', '金锁']) {
      await sleep(600);
      console.log(`  咔哒！${lockName}打开了`);
    }
    await sleep(800);
    return '恭喜!你找到了传说中的宝藏!';
  }
}

// 寻宝主流程：async/await + try/catch 顺序编排，异常分支也清晰可读
async function findTreasure() {
  try {
    const clue = await TreasureMap.getInitialClue();
    console.log(clue);

    const location = await TreasureMap.decodeAncientScript(clue);
    console.log(location);

    const forest = await TreasureMap.crossMistyForest();
    console.log(forest);

    const river = await TreasureMap.crossRiverByBoat();
    console.log(river);

    // 守卫分支：searchTemple 抛出的异常被内层捕获，转入猜拳环节
    let boxMessage;
    try {
      boxMessage = await TreasureMap.searchTemple();
    } catch (guardError) {
      console.log(guardError.message);
      boxMessage = await TreasureMap.challengeGuard();
    }
    console.log(boxMessage);

    const treasure = await TreasureMap.openTreasureBox();
    console.log(treasure);
  } catch (error) {
    console.error('任务失败:', error.message);
  }
}

findTreasure();
