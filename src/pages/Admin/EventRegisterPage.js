import React from "react";
import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import EventRegister from "../../components/admin/event/EventRegister";

const EventRegisterPage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader title={"공식행사 등록"} backBtn={true} />
        {/* 본문 컴포넌트  */}
        <EventRegister />
      </div>
    </Wrapper>
  );
};

export default EventRegisterPage;

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
