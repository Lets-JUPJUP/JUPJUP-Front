// post의 status 체크
export const checkStatus = (post) => {
    if (post.isEnded === true) {
      return "finish";
    } else if (post.isJoined === true) {
      return "join";
    } else {
      return "default";
    }
  };