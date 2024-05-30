import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReportRow from "./ReportRow";
import { adminGetReports } from "../../../api/admin";

const ReportManage = () => {
  const [reports, setReports] = useState([]);

  const getData = async () => {
    try {
      const data = (await adminGetReports()).data.data;

      console.log(data);
      data && setReports(data);
    } catch (err) {
      alert("데이터 조회 오류");
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
            <th>작성자 ID</th>
            <th>신고 대상 ID</th>
            <th>신고 텍스트</th>
            <th>이미지</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            return <ReportRow report={report} />;
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ReportManage;

const Wrapper = styled.div`
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

  /* DeclarationRow 컴포넌트 내부*/
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

  .text {
    cursor: pointer;
    max-width: 500px;
  }

  .url {
    cursor: pointer;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .overflow-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
