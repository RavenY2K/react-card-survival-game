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
      cardText: "大石块",
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
      cardName: "stone",
      cardText: "石头",
      quantity: 1,
    },
    {
      id: uuidv4(),
      order: 6,
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
    {
      id: uuidv4(),
      order: 7,
      cardText: "半个椰子",
      cardName: "coconut_half",
      quantity: 11,
    },
  ];

  //新卡片
  newCards = [];
  //增加数量的卡片
  addedQuantityCards = [];
  preTimer_newCards = null;
  preTimer_addedQuantityCards = null;

  //标记那些卡片是新加入的
  addNewCard = (id) => {
    this.newCards.push(id);
    clearTimeout(this.preTimer_newCards);
    this.preTimer_newCards = setTimeout(() => {
      this.clearNewCards();
    }, 400);
  };
  //标记那些卡片增加了数量
  addAddedQuantityCard = (id) => {
    this.addedQuantityCards.push(id);
    clearTimeout(this.preTimer_addedQuantityCards);
    this.preTimer_addedQuantityCards = setTimeout(() => {
      this.clearAddQuantityCards();
    }, 600);
  };

  activeCard = null;

  GameTime = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  //移动卡片
  moveCard(dragCard, dropCard) {
    if (dragCard.cardName === dropCard.cardName) {
      this.mergeCard(dragCard, dropCard);
      return;
    }
    const temp = dragCard.order;
    dragCard.order = dropCard.order;
    dropCard.order = temp;
  }

  //卡片使用函数 useType
  useCard(card, action) {
    const { useTime, produceItems, selfDestroy } = action;

    //使用时间
    this.GameTime += useTime;

    //自我摧毁
    const still_have_cards = selfDestroy ? this.removeCard(card) : true;

    //产生物品数量
    const produceCardNum = Object.keys(produceItems).length;
    //后面卡牌的order后移x位
    const orderChange = (still_have_cards ? 1 : 0) + produceCardNum;
    this.updateCardOrderBehindOrder(card.order-1, orderChange);

    // 产生物品
    if (produceCardNum > 0) {
      let newCardOrder = card.order + (still_have_cards ? 1 : 0);
      Object.keys(produceItems).forEach((key) => {
        const card = produceItems[key];
        this.addCard({ ...card, id: uuidv4() }, newCardOrder++);
      });
    }
  }

  //order之后的牌后移x位置
  updateCardOrderBehindOrder(order, x) {
    this.cards.forEach((item) => {
      if (item.order > order) item.order += x;
    });
  }

  //清除新卡片标记
  clearNewCards() {
    this.newCards = [];
  }
  //清除增加数量的卡片标记
  clearAddQuantityCards() {
    this.addedQuantityCards = [];
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
    const orderChange = (still_have_cards ? 1 : 0) + produceCardNum;
    this.updateCardOrderBehindOrder(card.order-1, orderChange);

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

  //合并卡片
  mergeCard(fromCard, toCard) {
    toCard.quantity += fromCard.quantity;
    this.removeCard(fromCard, fromCard.quantity);
    this.addAddedQuantityCard(toCard.id);
  }

  //去重卡片
  sortCards() {
    //去重cardNameSet
    const cardNameSet = new Set(this.cards.map((item) => item.cardName));

    this.cards.sort((a, b) => a.order - b.order);

    //遍历cardNameSet
    cardNameSet.forEach((cardName) => {
      const arr = this.cards.filter((item) => item.cardName === cardName);
      for (let i = 1; i < arr.length; i++) {
        this.mergeCard(arr[i], arr[0]);
      }
    });
    this.resetCardsOrder();
  }

  resetCardsOrder() {
    this.cards.forEach((item, index) => {
      item.order = index;
    });
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
      const curCard = { ...card, quantity, order };
      this.cards.push(curCard);
      this.addNewCard(curCard.id);
      return;
    }

    //如果order位置有卡，则增加卡片数量
    this.cards[cardIndex].quantity += quantity;
    this.addAddedQuantityCard(this.cards[cardIndex].id);
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
      this.updateCardOrderBehindOrder(card.order, -1);
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
