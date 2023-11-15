import axios from "axios";
import client from "./client";

export const memberGetMyProfile = async () => {
  //자신 프로필 조회
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

//중도이탈 예외처리
export const memberGetMyProfile_ = async (accessToken) => {
  //자신 프로필 조회_ 토큰 직접 전달
  try {
    console.log(accessToken);
    const res = await axios.get("https://api.lets-jupjup.com/api/v1/members", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const memberUpdateProfile_ = async (
  nickname,
  gender,
  profileImage,
  accessToken
) => {
  try {
    console.log(accessToken);
    const res = await axios.put(
      "https://api.lets-jupjup.com/api/v1/members",
      {
        nickname: nickname,
        gender: gender,
        profileImage: profileImage,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(res);
    return res.status;
  } catch (err) {
    alert("회원가입 오류");
  }
};

export const memberCheckValidName_ = async (nickname, accessToken) => {
  try {
    console.log("skdjfns", accessToken);
    const res = await axios.post(
      "https://api.lets-jupjup.com/api/v1/members/checkNickname",
      {
        nickname: nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
