import React from "react";
import styled from "styled-components";

const TrashDetail = () => {
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="odd">ID</td>
            <td className="even">푸르미 재활용 정거장</td>
            <td className="odd">카테고리</td>
            <td className="even">위치 000000000000</td>
            <td className="odd">위치 상세 000000</td>
          </tr>
        </tbody>
      </Table>

      <Table style={{ marginTop: "32px" }}>
        <thead className="thead">
          <tr>
            <th>x좌표</th>
            <th>y좌표</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="odd">37.1111111</td>
            <td className="even">125.5555555</td>
          </tr>
        </tbody>
      </Table>

      <div className="title">피드백</div>
      <Table>
        <thead className="thead">
          <tr>
            <th>코드</th>
            <th>피드백 내용</th>
            <th>피드백 수</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(() => {
            return (
              <tr>
                <td className="odd">0</td>
                <td className="even">피드백 내용이 기억이 안 나요</td>
                <td className="odd">00</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default TrashDetail;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  font-size: 16px;

  .title {
    font-size: 20px;
    font-weight: 600;

    margin-top: 60px;
    margin-bottom: 20px;
  }
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
