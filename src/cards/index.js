export const heavy_stone = {
    CardIndex: 3,
    CardText: "大石头",
    CardName: "heavy_stone",
    //使用方式
    UseType: [],
    //接受的交互物品
    AcceptItem: {
      stone: {
        CardIndex: 2,
        CardText: "石头",
        CardName: "stone",
        //交互名称
        InteractionName: "打磨石刀",
        //交互花费时间
        InteractionTime: 4,
        //产生的物品
        ProduceItem: {
          sharpened_stone: {
            CardIndex: 5,
            CardText: "石刀",
            CardName: "sharpened_stone",
          },
        },
        //是否自我摧毁
        selfDestroy: false,
        //是否催毁交互物品
        destroyActiveItem: true,
      },
    },
  };
  
export const stone = {
    CardIndex: 2,
    CardText: "石头",
    CardName: "stone",
    //使用方式
    UseType: [],
    //接受的交互物品
    AcceptItem: {
      heavy_stone: {
        CardIndex: 3,
        CardText: "大石头",
        CardName: "heavy_stone",
        //交互名称
        InteractionName: "打磨石刀",
        //交互花费时间
        InteractionTime: 4,
        //产生的物品
        ProduceItem: {
          sharpened_stone: {
            CardIndex: 5,
            CardText: "石刀",
            CardName: "sharpened_stone",
          },
        },
        //是否自我摧毁
        selfDestroy: true,
      },
    },
  };
  
export const husked_coconut = {
    CardIndex: 1,
    CardText: "青椰子",
    CardName: "husked_coconut",
    //使用方式
    UseType: [],
    //接受的交互物品
    AcceptItem: {
      stone: {
        CardIndex: 2,
        CardText: "石头",
        CardName: "stone",
        //交互名称
        InteractionName: "剥",
        //交互花费时间
        InteractionTime: 2,
        //产生的物品
        ProduceItem: {
          coconut: { CardIndex: 4, CardText: "椰子", CardName: "coconut" },
        },
        //是否自我摧毁
        selfDestroy: true,
      },
      heavy_stone: {
        CardIndex: 3,
        CardText: "重石头",
        CardName: "heavy_stone",
        //交互名称
        InteractionName: "剥",
        //交互花费时间
        InteractionTime: 2,
        //产生的物品
        ProduceItem: {
          coconut: { CardIndex: 4, CardText: "椰子", CardName: "coconut" },
        },
        //是否自我摧毁
        selfDestroy: true,
      },
    },
  };
  
export const coconut_shell = {
  CardIndex: 10,
  CardText: "椰壳",
  CardName: "coconut_shell",
  //使用方式
  UseType: [],
  //接受的交互物品
  AcceptItem: {},
};
export const coconut = {
  CardIndex: 4,
  CardText: "椰子",
  CardName: "coconut",
  //使用方式
  UseType: [],
  //接受的交互物品
  AcceptItem: {
    stone: {
      CardIndex: 2,
      CardText: "石头",
      CardName: "stone",
      //交互名称
      InteractionName: "敲开椰子",
      //交互花费时间
      InteractionTime: 0,
      //产生的物品
      ProduceItem: {
        coconut_half: {
          CardIndex: 8,
          CardText: "coconut_half",
          CardName: "半个椰子",
          quantity: 2,
        },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
    heavy_stone: {
      CardIndex: 3,
      CardText: "重石头",
      CardName: "heavy_stone",
      //交互名称
      InteractionName: "敲开椰子",
      //交互花费时间
      InteractionTime: 0,
      //产生的物品
      ProduceItem: {
        coconut: { CardIndex: 4, CardText: "椰子", CardName: "coconut" },
      },
      //是否自我摧毁
      selfDestroy: true,
    },
  },
};

export const coconut_half = {
  CardIndex: 8,
  CardText: "半个椰子",
  CardName: "coconut_half",
  //使用方式
  UseType: [
    {
      actionText: "吃",
      actionName: "eat",
      //是否自我摧毁
      selfDestroy: true,
      //产生的物品
      ProduceItem: {
        coconut_shell: {
          CardIndex: 10,
          CardText: "椰壳",
          CardName: "coconut_shell",
        },
      },
    },
  ],
  //接受的交互物品
  AcceptItem: {},
};

