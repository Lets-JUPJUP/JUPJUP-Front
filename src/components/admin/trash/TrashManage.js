import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { adminGetTrashCanLists } from "../../../api/admin";

import TrashRow from "./TrashRow";
import Pagination from "react-js-pagination";

const TrashManage = () => {
  const [trashCans, setTrashCans] = useState([]); // 쓰레기통 정보
  const [pageInfo, setPageInfo] = useState({}); // api로 받은 페이지 정보
  const [pageNo, setPageNo] = useState(1); // 현재 페이지

  const getData = async () => {
    try {
      // pageNo 0부터 시작하므로 -1
      const data = (await adminGetTrashCanLists(pageNo - 1)).data.data;
      data && setPageInfo(data.pageInfo);
      data && setTrashCans(data.trashCans);
      // console.log("전체 쓰레기통 피드백 조회", data);
    } catch (err) {
      alert("쓰레기통 피드백 데이터 조회 오류");
    }
  };

  useEffect(() => {
    getData();
  }, [pageNo]);

  // 페이지 이동 함수
  const handlePageChange = (page) => {
    setPageNo(page);
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
          {trashCans.map((trashCan) => {
            return <TrashRow trashCan={trashCan} />;
          })}
        </tbody>
      </Table>
      <Pagination
        activePage={pageNo} // 현재 페이지
        itemsCountPerPage={pageInfo.size} // 한 페이지 당 보여줄 리스트 아이템의 개수
        totalItemsCount={pageInfo.size * pageInfo.totalPages} // 총 아이템의 개수
        pageRangeDisplayed={10} // Paginator 내에서 보여줄 페이지의 범위
        prevPageText={"‹"} // "이전"을 나타낼 텍스트
        nextPageText={"›"} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
      />
    </Wrapper>
  );
};

export default TrashManage;

const Wrapper = styled.div`
  /* display: flex;
  flex-direction: column; */
  font-size: 16px;

  // pagination css
  .pagination {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-family: "Pretendard";

    margin: 50px 0;
  }

  ul {
    list-style: none;
  }

  li a {
    text-decoration: none;
    color: var(--black, #09090a);
    /* color: var(--grey2, #cdcdcd); */
  }

  li a:hover {
    font-weight: 600;
  }

  li.active a {
    color: var(--main, #410fd4);
    /* color: var(--sub, #beef62); */
    font-weight: 600;
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

  .row {
    cursor: pointer;
  }

  .address {
    max-width: 350px;
    word-wrap: break-word;
  }
`;
