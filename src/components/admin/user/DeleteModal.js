import React from "react";
import styled from "styled-components";
import { adminDeleteUser } from "../../../api/admin";

const DeleteModal = ({ targetId, setIsOpenModal }) => {
  const deleteUser = async (id) => {
    try {
      const status = (await adminDeleteUser(id)).data.status;
      console.log(status);
      if (status === 200) {
        alert("탈퇴 처리되었습니다.");
        window.location.reload();
      }
    } catch (err) {
      alert("강제 탈퇴 오류");
    }
  };
  return (
    <>
      <Bg onClick={() => setIsOpenModal(false)} />
      <Modal>
        <p>User ID: {targetId}를 강제 탈퇴시키겠습니까?</p>

        <div className="btns">
          <Btn onClick={() => setIsOpenModal(false)}>취소</Btn>{" "}
          <Btn onClick={() => deleteUser(targetId)}>네</Btn>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;

const Bg = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: gray;
  opacity: 40%;
`;
const Modal = styled.div`
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--black, #09090a);

  display: flex;
  flex-direction: column;
  gap: 45px;
  justify-content: center;
  align-items: center;

  p {
    color: #fff;
  }

  .btns {
    display: flex;
    gap: 60px;
  }
`;

const Btn = styled.div`
  display: flex;
  width: 74px;
  padding: 8px 12px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: var(--grey, #e8e8e8);
`;
