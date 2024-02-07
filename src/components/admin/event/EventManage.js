import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ic_close from "../../../assets/admin/ic_close_black.png";

const EventManage = () => {
  const navigate = useNavigate();

  // 공식행사 등록 페이지로 이동하는 함수
  const onGoToRegisterPage = () => {
    navigate(`/admin/event-register`);
  };

  return (
    <Wrapper>
      <GoToRegisterBtn onClick={onGoToRegisterPage}>
        행사 등록하기
      </GoToRegisterBtn>
      <Table>
        <thead className="thead">
          <tr>
            <th>행사명</th>
            <th>이미지</th>
            <th>연결 링크</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(() => {
            return (
              <tr>
                <td className="odd">행사 제목</td>
                <td className="even">img URL 00000000000000000000</td>
                <td className="odd">WEB URL 00000000000000000000</td>
                <td className="even">
                  <img src={ic_close} className="deleteImage" alt="삭제" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default EventManage;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  font-size: 16px;
  position: relative;
`;

const GoToRegisterBtn = styled.button`
  padding: 8px 12px;
  border: 0px;
  border-radius: 4px;

  font-size: 16px;
  font-weight: 600;

  background: var(--sub, #beef62);
  color: var(--main, #410fd4);

  position: absolute;
  top: -50px;
  right: 0;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0 4px;

  .thead {
    text-align: left;
  }

  th,
  td {
    box-sizing: border-box;
    padding: 8px;
  }

  .odd {
    background: var(--grey, #e8e8e8);
  }

  .even {
    background: var(--grey2, #cdcdcd);
  }

  .deleteImage {
    width: 20px;
    cursor: pointer;
  }
`;
