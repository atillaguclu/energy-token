from typing import List
from dataclasses import dataclass


@dataclass
class Order(object):
    userAddress: int
    Side: bool
    Quantity: int
    Price: int


@dataclass
class Match(object):
    Buy: Order
    Sell: Order


class Market(object):
    def __init__(self):
        self.Buys: List[Order] = []
        self.Sells: List[Order] = []
        self.Matches: List[Match] = []

    def AddOrder(self, order: Order):
        if order.Side:
            self.Sells.append(order)
        else:
            self.Buys.append(order)

    def MatchOrders(self):
        self.Buys = sorted(self.Buys, key=lambda x: x.Price)[::-1]
        self.Sells = sorted(self.Sells, key=lambda x: x.Price)

        while len(self.Buys) > 0 and len(self.Sells) > 0:
            if self.Buys[0].Price < self.Sells[0].Price:
                break
            else:  # self.Buys[0].Price >= self.Sells[0].Price:
                currBuy = self.Buys.pop()
                currSell = self.Sells.pop()
                if currBuy.Quantity != currSell.Quantity:
                    if currBuy.Quantity > currSell.Quantity:
                        newBuy = Order(
                            currBuy.userAddress,
                            currBuy.Side,
                            currBuy.Quantity - currSell.Quantity,
                            currBuy.Price,
                        )
                        self.Buys.insert(0, newBuy)
                        currBuy.Quantity = currSell.Quantity
                    else:
                        newSell = Order(
                            currSell.userAddress,
                            currSell.Side,
                            currSell.Quantity - currBuy.Quantity,
                            currSell.Price,
                        )
                        self.Sells.insert(0, newSell)
                        currSell.Quantity = currBuy.Quantity
                self.Matches.append(Match(currBuy, currSell))
                print(self.Matches)

    def ComputeClearingPrice(self) -> int:
        if len(self.Matches) == 0:
            return 0

        clearingPrice = 0
        cumulativeQuantity = 0
        for match in self.Matches:
            cumulativeQuantity += match.Buy.Quantity
            clearingPrice += (
                match.Buy.Quantity * (match.Buy.Price + match.Sell.Price) / 2
            )

        return clearingPrice / cumulativeQuantity


market = Market()
# buyOrder = Order(userAddress=0, Side=False, Quantity=25, Price=10)
# sellOrder = Order(userAddress=1, Side=True, Quantity=30, Price=9)
# buyOrder2 = Order(userAddress=2, Side=False, Quantity=14, Price=8)
# sellOrder2 = Order(userAddress=3, Side=True, Quantity=16, Price=11)
# buyOrder3 = Order(userAddress=6, Side=False, Quantity=20, Price=12)
# sellOrder3 = Order(userAddress=5, Side=True, Quantity=28, Price=9)
# buyOrder4 = Order(userAddress=4, Side=False, Quantity=19, Price=7)
# sellOrder4 = Order(userAddress=13, Side=True, Quantity=21, Price=9)
# buyOrder5 = Order(userAddress=8, Side=False, Quantity=23, Price=9)
# sellOrder5 = Order(userAddress=9, Side=True, Quantity=24, Price=6)
# buyOrder6 = Order(userAddress=7, Side=False, Quantity=25, Price=15)
# sellOrder6 = Order(userAddress=11, Side=True, Quantity=25, Price=11)


def addUser(_userAddress, _side, _quantity, _price):
    order = Order(
        userAddress=_userAddress, Side=_side, Quantity=_quantity, Price=_price
    )
    market.AddOrder(order)


addUser(0, False, 25, 10)
addUser(1, True, 25, 9)
addUser(2, False, 25, 15)
addUser(3, True, 25, 11)
addUser(4, False, 25, 12)
addUser(5, True, 25, 6)
addUser(6, False, 25, 8)
addUser(7, True, 25, 7)
market.MatchOrders()

market.ComputeClearingPrice()
