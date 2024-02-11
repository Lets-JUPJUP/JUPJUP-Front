import React from "react";

import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import ReportManage from "../../components/admin/declaration/ReportManage";

const ReportManagePage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader title={"신고내역 조회"} />
        {/* 본문 컴포넌트  */}
        <ReportManage />
      </div>
    </Wrapper>
  );
};

export default ReportManagePage;

const Wrapper = styled.div`
  display: flex;

  .content {
    display: flex;
    flex-direction: column;
    width: 78%;
    padding: 0 5%;
    box-sizing: border-box;
  }
`;
