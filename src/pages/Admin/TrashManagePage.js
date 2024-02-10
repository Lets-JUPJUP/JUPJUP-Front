import React from "react";
import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";

import TrashManage from "../../components/admin/trash/TrashManage";

const TrashManagePage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader
          title={"쓰레기통 관리"}
          subTitle={"각 쓰레기통 데이터를 클릭해 상세 정보를 조회하세요."}
        />
        {/* 본문 컴포넌트  */}
        <TrashManage />
      </div>
    </Wrapper>
  );
};

export default TrashManagePage;

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
