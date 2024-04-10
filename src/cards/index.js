const heavy_stone = {
  cardText: "大石块",
  cardName: "heavy_stone",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    // stone: {
    //   cardText: "石头",
    //   cardName: "stone",
    //   //交互名称
    //   interactionName: "打磨石刀",
    //   //交互花费时间
    //   interactionTime: 4,
    //   //产生的物品
    //   produceItems: {
    //     sharpened_stone: {
    //       cardText: "石刀",
    //       cardName: "sharpened_stone",
    //     },
    //   },
    //   //是否自我摧毁
    //   selfDestroy: false,
    //   //是否催毁交互物品
    //   destroyActiveItem: true,
    // },
  },
};

const stone = {
  cardText: "石头",
  cardName: "stone",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    heavy_stone: {
      cardText: "大石块",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "打磨石刀",
      //交互花费时间
      interactionTime: 4,
      //产生的物品
      produceItems: {
        sharpened_stone: {
          cardText: "石刀",
          cardName: "sharpened_stone",
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

const husked_coconut = {
  cardText: "青椰子",
  cardName: "husked_coconut",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    stone: {
      cardText: "石头",
      cardName: "stone",
      //交互名称
      interactionName: "剥",
      //交互花费时间
      interactionTime: 2,
      //产生的物品
      produceItems: {
        coconut: { cardText: "椰子", cardName: "coconut", quantity: 1 },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
    heavy_stone: {
      cardText: "大石块",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "剥",
      //交互花费时间
      interactionTime: 2,
      //产生的物品
      produceItems: {
        coconut: { cardText: "椰子", cardName: "coconut" },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

const coconut_shell = {
  cardText: "椰壳",
  cardName: "coconut_shell",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {},
};

const coconut = {
  cardText: "椰子",
  cardName: "coconut",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    stone: {
      cardText: "石头",
      cardName: "stone",
      //交互名称
      interactionName: "敲开椰子",
      //交互花费时间
      interactionTime: 0,
      //产生的物品
      produceItems: {
        coconut_half: {
          cardText: "半个椰子",
          cardName: "coconut_half",
          quantity: 2,
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
    heavy_stone: {
      cardText: "大石块",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "敲开椰子",
      //交互花费时间
      interactionTime: 0,
      //产生的物品
      produceItems: {
        coconut_half: {
          cardText: "半个椰子",
          cardName: "coconut_half",
          quantity: 2,
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

const coconut_half = {
  cardText: "半个椰子",
  cardName: "coconut_half",
  //使用方式
  useType: [
    {
      actionText: "吃",
      actionName: "eat",
      //是否自我摧毁
      selfDestroy: true,
      //使用时间
      useTime: 1,
      //产生的物品
      produceItems: {
        coconut_shell: {
          cardText: "椰壳",
          cardName: "coconut_shell",
        },
      },
    },
  ],
  //接受的交互物品
  acceptItem: {},
};

const sharpened_stone = {
  cardText: "石刀",
  cardName: "sharpened_stone",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {},
};
const cardsInfo = {
  coconut_half,
  coconut_shell,
  coconut,
  heavy_stone,
  stone,
  husked_coconut,
  sharpened_stone,
};
export default cardsInfo;
