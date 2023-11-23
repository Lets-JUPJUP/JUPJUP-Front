import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import add from "../../assets/common/add.png";
import cancel from "../../assets/common/cancel.png";
//사진 5장 첨부시 overflow-x: scroll으로 추후 수정
const AddPhoto = ({
  setImgFile,
  imgFile,
  isMultiple = false,
  maxFiles = 5,
}) => {
  //사진 첨부취소 작업
  const imgRef = useRef();
  const [previewImgs, setPreviewImgs] = useState([]); //미리보기 파일

  //사진 미리보기
  const handlePreviewImgs = (files) => {
    setPreviewImgs([]); //초기화

    for (var i = 0; i < files.length; i++) {
      //입력된 이미지 개수 만큼 반복하여 프리뷰 이미지 생성
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = async (e) => {
        setPreviewImgs((previewImgs) => [...previewImgs, e.target.result]);
      };
    }
  };

  //사진 첨부
  const uploadImg = () => {
    const maxFileLength = maxFiles; //이미지 최대 장수

    let newFiles = [...imgRef.current.files]; //다중 이미지 입력 받기

    let files = [...imgFile]; //기존에 입력 받았던 이미지들
    files = files.concat(newFiles); //새로 입력 받은 이미지 추가

    if (files.length > maxFileLength) {
      alert(`이미지는 최대 ${maxFileLength}장 첨부 가능합니다.`);
      files = files.slice(0, maxFileLength); //5장만 남기기
    }

    setImgFile(files); //이미지 파일 원본 저장 (최대 5장)

    handlePreviewImgs(files);
  };

  // 이미지 한장씩 첨부 취소
  const cancelUpload = (index) => {
    //프리뷰 취소
    const previews = [...previewImgs];
    previews.splice(index, 1);
    setPreviewImgs(previews);

    //파일 원본 첨부 취소
    const files = [...imgFile];
    files.splice(index, 1);
    setImgFile(files);
  };

  return (
    <Photo>
      <input
        className="input"
        accept=".jpg, .jpeg, .png"
        type="file"
        id="file-input"
        multiple={isMultiple}
        onChange={uploadImg}
        ref={imgRef}
      />
      <label htmlFor="file-input">
        <div className="subjects">
          <img className="add-icon" src={add} alt="" />
          사진 추가하기
        </div>
      </label>
      <PreviewContainer>
        {previewImgs.length ? (
          previewImgs.map((el, index) => {
            return (
              <Preview key={index}>
                <img className="preview-image" src={el} alt="" />
                <div className="cancel-btn" onClick={() => cancelUpload(index)}>
                  <img className="cancel-icon" src={cancel} alt="" />
                </div>
              </Preview>
            );
          })
        ) : (
          <div className="preview"></div>
        )}
      </PreviewContainer>
    </Photo>
  );
};

export default AddPhoto;
const Photo = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  .input {
    display: none;
  }
  .subjects {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px; /* 150% */
  }
  .add-icon {
    width: 12px;
    height: 12px;
    margin-right: 3px;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
  overflow-x: scroll; // 안먹힘
  width: 100%;
  height: 85px;
`;

const Preview = styled.div`
  display: flex;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  position: relative;
  .preview-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  .cancel-btn {
    position: absolute;
    top: 4px;
    right: 2px;
    .cancel-icon {
      width: 20px;
      height: 20px;
    }
  }

  //아래 코드로 해도 안됨
  /* .cancel-btn {
    .cancel-icon {
      margin-left: -23px;
      margin-top: 2px;
      width: 20px;
      height: 20px;
    }
  } */
`;
