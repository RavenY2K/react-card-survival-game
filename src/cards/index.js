const heavy_stone = {
  cardID: 3,
  cardText: "大石头",
  cardName: "heavy_stone",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    // stone: {
    //   cardID: 2,
    //   cardText: "石头",
    //   cardName: "stone",
    //   //交互名称
    //   interactionName: "打磨石刀",
    //   //交互花费时间
    //   interactionTime: 4,
    //   //产生的物品
    //   produceItem: {
    //     sharpened_stone: {
    //       cardID: 5,
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
  cardID: 2,
  cardText: "石头",
  cardName: "stone",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    heavy_stone: {
      cardID: 3,
      cardText: "大石头",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "打磨石刀",
      //交互花费时间
      interactionTime: 4,
      //产生的物品
      produceItem: {
        sharpened_stone: {
          cardID: 5,
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
  cardID: 1,
  cardText: "青椰子",
  cardName: "husked_coconut",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    stone: {
      cardID: 2,
      cardText: "石头",
      cardName: "stone",
      //交互名称
      interactionName: "剥",
      //交互花费时间
      interactionTime: 2,
      //产生的物品
      produceItem: {
        coconut: { cardID: 4, cardText: "椰子", cardName: "coconut" },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
    heavy_stone: {
      cardID: 3,
      cardText: "重石头",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "剥",
      //交互花费时间
      interactionTime: 2,
      //产生的物品
      produceItem: {
        coconut: { cardID: 4, cardText: "椰子", cardName: "coconut" },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

const coconut_shell = {
  cardID: 10,
  cardText: "椰壳",
  cardName: "coconut_shell",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {},
};

const coconut = {
  cardID: 4,
  cardText: "椰子",
  cardName: "coconut",
  //使用方式
  useType: [],
  //接受的交互物品
  acceptItem: {
    stone: {
      cardID: 2,
      cardText: "石头",
      cardName: "stone",
      //交互名称
      interactionName: "敲开椰子",
      //交互花费时间
      interactionTime: 0,
      //产生的物品
      produceItem: {
        coconut_half: {
          cardID: 8,
          cardText: "coconut_half",
          cardName: "半个椰子",
          quantity: 2,
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
    heavy_stone: {
      cardID: 3,
      cardText: "重石头",
      cardName: "heavy_stone",
      //交互名称
      interactionName: "敲开椰子",
      //交互花费时间
      interactionTime: 0,
      //产生的物品
      produceItem: {
        coconut_half: {
          cardID: 8,
          cardText: "coconut_half",
          cardName: "半个椰子",
          quantity: 2,
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

const coconut_half = {
  cardID: 8,
  cardText: "半个椰子",
  cardName: "coconut_half",
  //使用方式
  useType: [
    {
      actionText: "吃",
      actionName: "eat",
      //是否自我摧毁
      selfDestroy: true,
      //产生的物品
      produceItem: {
        coconut_shell: {
          cardID: 10,
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
  cardID: 5,
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
