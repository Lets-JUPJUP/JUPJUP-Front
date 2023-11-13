export const ageRange = [
  {
    key: "AGE_10_19",
    range: 10,
  },
  {
    key: "AGE_20_29",
    range: 20,
  },
  {
    key: "AGE_30_39",
    range: 30,
  },
  {
    key: "AGE_40_49",
    range: 40,
  },
  {
    key: "AGE_50_59",
    range: 50,
  },
  {
    key: "AGE_60_69",
    range: 60,
  },
  {
    key: "AGE_70_79",
    range: 70,
  },
];

export const getAgeRange = (key) => {
  let range;
  ageRange.map((el) => {
    if (el.key === key) {
      range = el.range;
    }
  });

  return range;
};
