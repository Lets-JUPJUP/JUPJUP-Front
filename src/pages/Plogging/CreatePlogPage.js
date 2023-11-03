import React from "react";
import { styled } from "styled-components";
import Header from "../../components/common/Header";
import Form from "../../components/create/Form";

const CreatePlogPage = () => {
  return (
    <Wrapper>
      <Header title={"플로깅 이벤트"} isLogin={true} />
      <div className="gap" />
      <Form />
    </Wrapper>
  );
};

export default CreatePlogPage;
const Wrapper = styled.div`
  .gap {
    height: 12px;
  }
`;
