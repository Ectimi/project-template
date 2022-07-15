import dayjs from 'dayjs';

const random = (min: number, max: number) =>
  min + Math.round(Math.random() * (max - min));

//随机颜色
const randomColor = () => `#${Math.random().toString(16).substring(2, 6)}`;

//格式化数字金额，每千分位用逗号隔开
const formatAmount = (amount: string|number) =>
  amount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');

const fillZero = (str: string) => (str.length > 1 ? str : `0${str}`);

const getNearlyDay = (num: number) => {
  const days: string[] = [];

  for (let i = 0; i < num; i++) {
    const month = fillZero((dayjs().subtract(i, 'd').month() + 1).toString());
    const date = fillZero(dayjs().subtract(i, 'd').date().toString());
    days.push(`${month}/${date}`);
  }
  return days;
};

const getNearlyMonth = (num: number) => {
  const months: string[] = [];

  for (let i = 0; i < num; i++) {
    const year = dayjs().subtract(i, 'M').year();
    const date = fillZero((dayjs().subtract(i, 'M').month() + 1).toString());
    months.push(`${year}/${date}`);
  }
  return months;
};

export {
  random,
  randomColor,
  formatAmount,
  fillZero,
  getNearlyDay,
  getNearlyMonth,
};
