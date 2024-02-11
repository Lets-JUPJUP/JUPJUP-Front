import React, { useState } from "react";
import ic_close_black from "../../../assets/admin/ic_close_black.png";
import styled from "styled-components";
import DeleteUserBtn from "../user/DeleteUserBtn";

const ReportRow = ({ report }) => {
  const [isClicked, setIsClicked] = useState(false);

  return !isClicked ? (
    <tr>
      <td className="odd">{report.writerId}</td>
      <td className="even">{report.targetId}</td>
      <td
        className="odd text overflow-hidden"
        onClick={() => setIsClicked(!isClicked)}
      >
        {report.content}
      </td>
      <td
        className="even url"
        onClick={() => {
          window.open(report.fileUrls[0]);
        }}
      >
        {report.fileUrls[0]}
      </td>
      <td className="odd">
        <DeleteUserBtn targetId={report.targetId} />
      </td>
    </tr>
  ) : (
    <tr>
      <td className="odd">{report.writerId}</td>
      <td className="even">{report.targetId}</td>
      <td className="odd text" onClick={() => setIsClicked(!isClicked)}>
        {report.content}
      </td>
      <td
        className="even url"
        onClick={() => {
          window.open(report.fileUrls[0]);
        }}
      >
        {report.fileUrls[0]}
      </td>
      <td className="odd">
        <DeleteUserBtn targetId={report.targetId} />
      </td>
    </tr>
  );
};

export default ReportRow;
