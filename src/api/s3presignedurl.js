import { client } from "./client";
import axios from "axios";

//이미지 업로드 할 presigned url 받기
export const s3GetPresignedUrls = async (imageNames) => {
  //이미지 파일명을 배열로 보내고(최대 5장), presigned url을 응답 받은 뒤 리턴한다.
  //이미지 하나일때도 배열로 보냄.
  return client.post(`/api/v1/images`, {
    imageList: imageNames,
  });
};

//받은 presigned url에 이미지 파일 업로드
export const s3PutImageToUrl = async (imgFile, url) => {
  const headers = {
    "Content-Type": imgFile.type,
  };
  axios.put(url, imgFile, { headers });
  console.log(url);
};

//이미지 파일 배열을 넣으면 url 발급 & 업로드 완료한 url 배열을 반환하는 함수
export const s3GetImageUrl = async (imgFile) => {
  //이미지명 배열화
  let imageNames = [];

  imageNames.push(
    ...imgFile.map((el) => {
      return el.name;
    })
  );
  console.log(imgFile);
  console.log(imageNames);

  //s3 presigned url 얻기
  const res = await s3GetPresignedUrls(imageNames);
  const presigned_urls = res.data.data;

  console.log(presigned_urls);

  //각 이미지 발급 받은 url에 업로드
  for (var i = 0; i < imgFile.length; i++) {
    s3PutImageToUrl(imgFile[i], presigned_urls[i].presignedUrl);
  }

  //이미지 조회용 url 배열화
  let img_urls = [];
  img_urls.push(
    ...presigned_urls.map((el) => {
      return el.presignedUrl.split("?")[0];
    })
  );

  return img_urls;
};
