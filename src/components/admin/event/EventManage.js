import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { adminGetEvents } from "../../../api/admin";
import EventRow from "./EventRow";

const EventManage = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const data = (await adminGetEvents()).data.data;
      // console.log("공식 행사 조회", data);
      data && setEvents(data);
    } catch (err) {
      alert("공식 행사 데이터 조회 오류");
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          {events.map((event) => {
            return <EventRow event={event} key={event.id}/>;
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

  .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 20px;
      cursor: pointer;
    }
  }

  .title {
    max-width: 200px;
    word-wrap: break-word;
  }

  .url {
    cursor: pointer;
    max-width: 250px;
    word-wrap: break-word;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
  }
`;
