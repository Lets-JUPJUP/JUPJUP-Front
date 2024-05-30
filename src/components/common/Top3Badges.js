import Badge from "../user/Badge";
import { badgeList } from "../user/Badge";
import React from "react";
import { styled } from "styled-components";

const Top3Badges = ({ list = [] }) => {
  return list.length !== 0 ? (
    <Wrapper>
      {list[0] && (
        <div className="badge">
          <Badge
            id={list[0].code}
            size="16px"
            isShowCount={true}
            count={list[0].count}
          />
        </div>
      )}
      {list[1] && (
        <div className="badge">
          <Badge
            id={list[1].code}
            size="16px"
            isShowCount={true}
            count={list[1].count}
          />
        </div>
      )}
      {list[2] && (
        <div className="badge">
          <Badge
            id={list[2].code}
            size="16px"
            isShowCount={true}
            count={list[2].count}
          />
        </div>
      )}
    </Wrapper>
  ) : (
    <div>아직 획득한 뱃지가 없습니다</div>
  );
};

export default Top3Badges;

const Wrapper = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px; /* 150% */

  .badge {
    display: flex;
    gap: 5px;
    margin-bottom: 12px;
  }

  .circle-num {
    margin-top: 1px;
  }
`;
