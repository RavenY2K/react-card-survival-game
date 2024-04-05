import { autorun, makeAutoObservable } from "mobx";
import update from "immutability-helper";
import cardsInfo from "../cards";

class cardsStore {
  cards = [
    {
      cardID: 2,
      cardName: "stone",
      cardText: "石头",
      quantity: 1,
    },
    {
      cardID: 1,
      cardName: "husked_coconut",
      cardText: "青椰子",
      quantity: 1,
    },
    {
      cardID: 3,
      cardName: "heavy_stone",
      cardText: "大石头",
      quantity: 1,
    },
    {
      cardID: 10,
      cardName: "coconut_shell",
      cardText: "椰壳",
      quantity: 1,
    },
    {
      cardID: 4,
      cardName: "coconut",
      cardText: "椰子",
      quantity: 1,
    },
    {
      cardID: 8,
      cardText: "半个椰子",
      cardName: "coconut_half",
      quantity: 11,
    },
  ];

  activeCard = null;

  GameTime = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  //卡片使用函数
  useCard(cardName, actionName) {
    const cardInfo = cardsInfo[cardName];
    const { useType, acceptItem } = cardInfo;
    const { produceItem, selfDestroy } = useType.find(
      (item) => item.actionName === actionName
    );
    if (selfDestroy) {
      this.removeCard(cardName);
    }
    if (produceItem) {
      Object.entries(produceItem).forEach(
        ([produceCardName, produceCardInfo]) => {
          this.addCard(produceCardInfo);
        }
      );
    }
  }

  // 功能交互
  // 根据已经点击使用的卡片activeCard(石头...)和使用的action(砸开椰子...),产生交互
  /*
    cardsName: 卡片名称
    cardIndex: 卡片索引
    action: {
        interactionTime: 0, //交互时间
        produceItem: {}, //产生的物品
        selfDestroy: true, //自我摧毁
        destroyActiveItem: true //摧毁交互物品
    }
  */
  interaction(cardsName, cardIndex, action) {
    if (this.activeCard === null) return;

    const { interactionTime, produceItem, selfDestroy, destroyActiveItem } =
      action;

    // 交互时间
    this.GameTime += interactionTime;
    // 产生物品
    if (Object.keys(produceItem).length > 0) {

      Object.entries(produceItem).forEach(([produceCardName, { quantity }]) =>
        this.addCard(produceCardName, quantity,cardIndex)
      );
    }
    console.log(this.cards);
    // 自我摧毁
    if (selfDestroy) {
      this.removeCard(cardsName);
    }
    //催毁交互物品
    if (destroyActiveItem) {
      this.removeCard(this.activeCard);
    }
  }

  setActiveCard(cardName) {
    this.activeCard = cardName;
  }

  //获取卡片数量
  get cardCount() {
    return this.cards.length;
  }

  /*
    添加卡片
    cardName: 卡片名称
    quantity?: 卡片数量(默认为1)
    index?: 卡片的index位置
  */
  addCard(cardName, quantity = 1, index) {
    const { cardID, cardText } = cardsInfo[cardName];

    //如果有index,则在index位置添加卡片
    if (index !== undefined) {
      this.cards.splice(index, 0, { cardID, cardName, cardText, quantity });
      return;
    }

    //如果没有index,则在末尾添加卡片
    const cardIndex = this.cards.findIndex(
      (card) => card.cardName === cardName
    );
    //如果没有这个卡片
    if (cardIndex === -1) {
      //添加新卡片
      this.cards.push({ cardID, cardName, cardText, quantity });
    } else {
      //如果有这个卡片,卡片数量+1
      this.cards[cardIndex].quantity += quantity;
    }
  }

  /*
    移除卡片
    cardName:卡片名称
    quantity:卡片数量(默认为1)
  */
  removeCard(cardName, quantity = 1) {
    const cardIndex = this.cards.findIndex(
      (card) => card.cardName === cardName
    );
    //如果没有这个卡片
    if (cardIndex === -1) {
      return;
    } else {
      //如果有这个卡片
      this.cards[cardIndex].quantity -= quantity;
      //如果卡片数量为0,删除卡片
      if (this.cards[cardIndex].quantity <= 0) {
        this.cards.splice(cardIndex, 1);
      }
    }
  }

  //移动卡片
  moveCard(dragIndex, hoverIndex) {
    this.cards = update(this.cards, {
      $splice: [
        [dragIndex, 1],
        [dragIndex, 0, this.cards[hoverIndex]],
        [hoverIndex, 1],
        [hoverIndex, 0, this.cards[dragIndex]],
      ],
    });
  }
}
const store = new cardsStore();
export default store;
