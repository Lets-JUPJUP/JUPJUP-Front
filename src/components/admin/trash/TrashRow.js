import React from "react";
import { useNavigate } from "react-router-dom";

const TrashRow = ({ trashCan }) => {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    navigate(`/admin/trash-detail/${trashCan.trashCanId}`);
  };
  
  return (
    <tr className="row" onClick={goToDetailPage}>
      <td className="odd">{trashCan.trashCanId}</td>
      <td className="even">
        {trashCan.trashCanType === "STREET_TRASH_CAN"
          ? "가로 쓰레기통"
          : "푸르미 재활용 정거장"}
      </td>
      <td className="odd">{trashCan.trashCategory}</td>
      <td className="even address">{trashCan.address}</td>
      <td className="odd">{trashCan.detail}</td>
      <td className="even">{trashCan.feedbackCount}</td>
    </tr>
  );
};

export default TrashRow;
