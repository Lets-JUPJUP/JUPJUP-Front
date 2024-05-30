import React from "react";
import styled from "styled-components";

import AdminSideBar from "../../components/admin/AdminSideBar";
import AdminHeader from "../../components/admin/AdminHeader";
import UserManage from "../../components/admin/user/UserManage";

const UserManagePage = () => {
  return (
    <Wrapper>
      <AdminSideBar />
      <div className="content">
        <AdminHeader title={"사용자 전체 조회"} />
        <UserManage />
      </div>
    </Wrapper>
  );
};

export default UserManagePage;

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
