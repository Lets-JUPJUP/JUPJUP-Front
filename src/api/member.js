import client from "./client";

export const memberGetMyProfile = async () => {
  try {
    const res = await client.get("api/v1/members");

    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberCheckValidName = async (nickname) => {
  try {
    const res = await client.post("api/v1/members/checkNickname", {
      nickname: nickname,
    });

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberUpdateProfile = async (nickname, gender, profileImage) => {
  try {
    const res = await client.put("/api/v1/members", {
      nickname: nickname,
      gender: gender,
      profileImage: profileImage,
    });

    console.log(res);
    return res.status;
  } catch (err) {
    alert("회원가입 오류");
  }
};
