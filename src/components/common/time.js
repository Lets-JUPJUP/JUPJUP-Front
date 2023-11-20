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
