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
  {
    key: "AGE_ANY",
    range: "연령무관",
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

export const getAgeRangeKey = (range) => {
  let range_key;
  ageRange.map((el) => {
    if (el.range === range) {
      range_key = el.key;
    }
  });

  return range_key;
};

export const getFormattedAgeRange = (ageRange) => {
  let collection_age_range = [];
  let gap = (ageRange[1] - ageRange[0]) / 10; // 10-40세 선택시, 10-19, 20-29, 30-39세개의 키로 나누어야함. (40-10)/10=3

  while (gap--) {
    collection_age_range.push(getAgeRangeKey(ageRange[0] + 10 * gap));
  }
  return collection_age_range;
};

// postAgeRanges 배열 '~세'로 변환
// age 설정 (ex. ['AGE_20_29', 'AGE_30_39'])
export const settingAge = (postAgeRanges) => {
  if (postAgeRanges[0] === "AGE_ANY") {
    return "연령무관";
  } else {
    // 오름차순 정렬
    const sortedAgeRanges = [...postAgeRanges].sort();
    // 최소값, 최대값 return
    return (
      sortedAgeRanges[0].split("_")[1] +
      "~" +
      sortedAgeRanges[sortedAgeRanges.length - 1].split("_")[2] +
      "세"
    );
  }
};
