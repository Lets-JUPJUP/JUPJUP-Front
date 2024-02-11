import React, { useState } from "react";
import ic_close_black from "../../../assets/admin/ic_close_black.png";
import styled from "styled-components";
import DeleteModal from "./DeleteModal";

const DeleteUserBtn = ({ targetId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const showModal = () => {
    setIsOpenModal(true);
  };
  return (
    <>
      <Btn onClick={showModal}>
        <img className="btn" src={ic_close_black} alt="" />
      </Btn>
      {isOpenModal && (
        <DeleteModal setIsOpenModal={setIsOpenModal} targetId={targetId} />
      )}
    </>
  );
};

export default DeleteUserBtn;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    width: 20px;
    height: 20px;
  }
`;

const Modal = styled.div`
  position: absolute;

  width: 600px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--black, #09090a);
`;
