import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TrashManage = () => {
  const navigate = useNavigate();

  // 쓰레기통 관리 상세 페이지로 이동하는 함수
  const onGoToDetailPage = (trashCanId) => {
    navigate(`/admin/trash-detail/${trashCanId}`);
  };

  return (
    <Wrapper>
      <Table>
        <thead className="thead">
          <tr>
            <th>쓰레기통 ID</th>
            <th>분류</th>
            <th>카테고리</th>
            <th>위치</th>
            <th>위치 상세</th>
            <th>피드백 수</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(() => {
            return (
              <tr>
                <td className="odd">ID</td>
                <td className="even">푸르미 재활용 정거장</td>
                <td className="odd">카테고리</td>
                <td className="even">위치 000000000000</td>
                <td className="odd">위치 상세 000000</td>
                <td className="even">피드백 수</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default TrashManage;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0 4px;

  .thead {
    text-align: left;
  }

  th {
    white-space: nowrap;
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
