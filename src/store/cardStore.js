import { autorun, makeAutoObservable, action, set } from "mobx";
import { v4 as uuidv4 } from "uuid";
import update from "immutability-helper";
import cardsInfo from "../cards";

class cardsStore {
  cards = [
    {
      id: uuidv4(),
      order: 0,
      cardName: "stone",
      cardText: "石头",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 1,
      cardName: "husked_coconut",
      cardText: "青椰子",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 2,
      cardName: "heavy_stone",
      cardText: "大石头",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 3,
      cardName: "coconut_shell",
      cardText: "椰壳",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 4,
      cardName: "coconut",
      cardText: "椰子",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 5,
      cardText: "半个椰子",
      cardName: "coconut_half",
      quantity: 11,
    },
  ];

  //新卡片
  newCards = [];
  //增加数量的卡片
  addQuantityCards = [];

  activeCard = null;

  GameTime = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    // autorun(() => {
    // console.log("observer", this.cards, this.activeCardIndex, this.GameTime);
    // });
  }

  //移动卡片
  moveCard(dragCard, dropCard) {
    const temp = dragCard.order;
    dragCard.order = dropCard.order;
    dropCard.order = temp;
  }

  //卡片使用函数 useType
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

  //清除新卡片
  clearNewCards() {
    console.log("clearNewCards");
    this.newCards = [];
  }
  //清除增加数量的卡片
  clearAddQuantityCards() {
    this.addQuantityCards = [];
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
  interaction(card, action) {
    if (this.activeCard === null) return;

    const { interactionTime, produceItems, selfDestroy, destroyActiveItem } =
      action;

    // 交互时间
    this.GameTime += interactionTime;

    // 自我摧毁后是否还剩卡片站位
    const still_have_cards = selfDestroy ? this.removeCard(card) : true;

    //产生物品数量
    const produceCardNum = Object.keys(produceItems).length;
    //后面卡牌的order后移x位
    const orderChange = (still_have_cards ? 0 : -1) + produceCardNum;
    this.cards.forEach((item) => {
      if (item.order > card.order) item.order += orderChange;
    });

    // 产生物品
    if (produceCardNum > 0) {
      let newCardOrder = card.order + (still_have_cards ? 1 : 0);
      Object.keys(produceItems).forEach((key) => {
        const card = produceItems[key];
        this.addCard({ ...card, id: uuidv4() }, newCardOrder++);
      });
    }

    //催毁交互物品(暂时废除)
    if (destroyActiveItem) {
      //   this.removeCard(this.activeCard);
    }
  }

  setActiveCard(card) {
    this.activeCard = card;
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
  addCard(card, order) {
    //如果order位置有卡片
    const cardIndex = this.cards.findIndex((item) => item.order === order);
    const quantity = card.quantity ? card.quantity : 1;

    //如果有order位置没卡,就是在order位置新增栏位卡片
    if (cardIndex === -1) {
      this.newCards.push(order);
      setTimeout(() => {
        this.clearNewCards();
      }, 400);
      this.cards.push({ ...card, quantity, order });
      return;
    }

    //如果order位置有卡，则增加卡片数量
    this.cards[cardIndex].quantity += quantity;
    // this.addQuantityCards=[...this.addQuantityCards,order]
    this.addQuantityCards.push(order);
    setTimeout(() => {
      this.clearAddQuantityCards()
    }, 400);
  }

  /*
    移除卡片
    cardIndex:卡片index
    quantity:卡片数量(默认为1)
    return :still have cards
    -false:删除后卡片数量为0 -true:卡片数量还有剩余
  */
  removeCard(card, quantity = 1) {
    card.quantity -= quantity;
    //如果卡片数量为0,删除卡片
    if (card.quantity <= 0) {
      this.cards.forEach((item) => {
        //后面的卡牌都前移一位
        // if (item.order > card.order) item.order--;
      });

      const cardIndex = this.cards.findIndex(
        (item) => item.order === card.order
      );
      this.cards.splice(cardIndex, 1);
      return false;
    }
    return true;
  }
}
const store = new cardsStore();
export default store;
