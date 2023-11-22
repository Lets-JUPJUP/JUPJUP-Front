// Date 설정 (ex. "2023-03-06T09:30:00")
// isKor을 true로 설정하면 한글버전이 return됨
export const settingDate = (plogDate, isKor = false) => {
  const [date, time] = plogDate.split("T");
  const [, month, day] = date.split("-");
  // time에서 seconds는 제외하고 출력
  const [hour, minute] = time.split(":");
  return isKor
    ? month + "월 " + day + "일 " + hour + ":" + minute
    : month + "/" + day + " " + hour + ":" + minute;
};

// 마감 시간 카운트다운
export const countDDay = (dueDate) => {
  const currentDate = new Date(); // 현재 시간
  const deadlineDate = new Date(dueDate); // 마감 시간

  // 현재 시간과 마감 시간 간의 차이 계산 (밀리초로 반환)
  const timeDifference = deadlineDate - currentDate;

  // 차이를 시간과 분으로 변환
  const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesRemaining = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  return minutesRemaining <= 0
    ? "모집 마감"
    : `모집 마감까지 ${hoursRemaining}시간 ${minutesRemaining}분`;
};
