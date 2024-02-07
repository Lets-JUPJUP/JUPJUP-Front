import React from "react";
import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";

import EventManage from "../../components/admin/event/EventManage";

const EventManagePage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader title={"공식행사 관리"} />
        {/* 본문 컴포넌트  */}
        <EventManage />
      </div>
    </Wrapper>
  );
};

export default EventManagePage;

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
