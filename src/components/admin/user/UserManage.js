import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteUserBtn from "./DeleteUserBtn";
import { adminGetUsers } from "../../../api/admin";

const UserAll = () => {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const data = (await adminGetUsers()).data.data.members;

      console.log(data);
      data && setUsers(data);
    } catch (err) {
      alert("데이터 조회 오류");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Wrapper>
      <Table>
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>연령</th>
            <th>성별</th>
            <th>탈퇴</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td className="odd">{user.id}</td>
                <td className="even">{user.nickname}</td>
                <td className="odd">{user.email}</td>
                <td className="even">{user.ageRange}</td>
                <td className="odd">{user.gender}</td>
                <td className="even">
                  <DeleteUserBtn targetId={user.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default UserAll;

const Wrapper = styled.div`
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 0 4px;

  .thead {
    text-align: left;
  }

  th {
    white-space: nowrap;
  }

  th,
  td {
    box-sizing: border-box;
    padding: 8px;
  }

  .odd {
    background: var(--grey, #e8e8e8);
  }

  .even {
    background: var(--grey2, #cdcdcd);
  }
`;
