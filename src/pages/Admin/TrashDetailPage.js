import React from "react";
import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";

import TrashDetail from "../../components/admin/trash/TrashDetail";

const TrashDetailPage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader
          title={"쓰레기통 관리 상세"}
          subTitle={"각 쓰레기통 데이터를 클릭해 상세 정보를 조회하세요."}
          backBtn={true}
        />
        {/* 본문 컴포넌트  */}
        <TrashDetail />
      </div>
    </Wrapper>
  );
};

export default TrashDetailPage;

const Wrapper = styled.div`
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    width: 78%;
    padding: 0 7.5%;
    box-sizing: border-box;
  }
`;
