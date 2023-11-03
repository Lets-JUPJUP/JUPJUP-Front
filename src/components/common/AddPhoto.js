import React from "react";
import styled from "@emotion/styled";
import add from "../../assets/common/add.png";
const AddPhoto = () => {
  return (
    <Photo>
      <div className="subjects">
        <img className="add-icon" src={add} alt="" />
        사진 추가하기
      </div>
      <div className="preview">
        <img src="" />
      </div>
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

  .subjects {
    display: flex;
    align-items: center;
  }
  .add-icon {
    width: 12px;
    height: 12px;
    margin-right: 3px;
  }
  .preview {
    display: flex;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 8px;
    background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  }
`;
