import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { adminGetTrashCanFeedbacks } from "../../../api/admin";

const TrashDetail = () => {
  // 특정 쓰레기통 id
  const trashCanId = useParams().id;

  // 쓰레기통 정보 데이터
  const [trashCanInfo, setTrashCanInfo] = useState({});

  // 쓰레기통 피드백 데이터
  const [trashCanFeedbacks, setTrashCanFeedbacks] = useState([]);

  const getData = async () => {
    try {
      const data = (await adminGetTrashCanFeedbacks(trashCanId)).data.data;
      // console.log("특정 쓰레기통 조회", data);
      data && setTrashCanInfo(data.trashCanDto);
      data && setTrashCanFeedbacks(data.feedbacks);
    } catch (err) {
      alert("특정 쓰레기통 피드백 데이터 조회 오류");
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
            <td className="odd">{trashCanInfo.trashCanId}</td>
            <td className="even">
              {trashCanInfo.trashCanType === "STREET_TRASH_CAN"
                ? "가로 쓰레기통"
                : "푸르미 재활용 정거장"}
            </td>
            <td className="odd">{trashCanInfo.trashCategory}</td>
            <td className="even">{trashCanInfo.address}</td>
            <td className="odd">{trashCanInfo.detail}</td>
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
            <td className="odd">{trashCanInfo.latitude}</td>
            <td className="even">{trashCanInfo.longitude}</td>
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
          {trashCanFeedbacks.map((feedback) => {
            return (
              <tr key={feedback.feedbackCode}>
                <td className="odd">{feedback.feedbackCode}</td>
                <td className="even">{feedback.feedback}</td>
                <td className="odd">{feedback.count}</td>
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

  .address {
    max-width: 350px;
    word-wrap: break-word;
  }
`;
