function checkCashRegister(price, cash, cid) {
  const units = [
    ["One-hundred Dollars", 100],
    ["Twenty Dollars", 20],
    ["Ten Dollars", 10],
    ["Five Dollars", 5],
    ["Dollar", 1],
    ["Quarter", 0.25],
    ["Dime", 0.1],
    ["Nickel", 0.05],
    ["Penny", 0.01]
  ];

  let changeValue = cash - price;
  let change = [];

  cid.reverse();

  cid.forEach((currency, index) => {
    change.push([currency[0], 0]);

    if (changeValue > units[index][1]) {
      while (currency[1] > 0 && changeValue >= units[index][1]) {
        changeValue = Math.round(changeValue * 100) / 100;
        changeValue -= units[index][1];
        change[index][1] += units[index][1];
        currency[1] -= units[index][1];
      }
    }
  });

  if (changeValue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeValue === 0) {
    for (let i = 0; i < cid.length; i++) {
      if (cid[i][1] > 0) {
        change = change.filter((currency) => currency[1] !== 0);
        return { status: "OPEN", change };
      }
    }
  }

  cid = change.slice();
  cid.map((currency) => {
    currency[1] = Math.round(currency[1] * 100) / 100;
    return [currency[0], currency[1]];
  });
  cid.reverse();

  return { status: "CLOSED", change: cid };
}

checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
