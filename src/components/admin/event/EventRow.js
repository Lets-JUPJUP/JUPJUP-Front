import React from "react";
import ic_close from "../../../assets/admin/ic_close_black.png";
import { adminDeleteEvent } from "../../../api/admin";

const EventRow = ({ event }) => {
  // x버튼 클릭 시 게시글 삭제 실행
  const handleDeleteEvent = async () => {
    try {
      const res = await adminDeleteEvent(event.id);
      if (res.status === 200) {
        alert("게시글이 삭제되었습니다.");
        window.location.reload();
      }
    } catch (err) {
      alert("공식 행사 게시글 삭제 오류");
    }
  };

  return (
    <tr>
      <td className="odd title">{event.title}</td>
      <td className="even url" onClick={() => window.open(event.imageUrl)}>
        {event.imageUrl}
      </td>
      <td className="odd url" onClick={() => window.open(event.infoUrl)}>
        {event.infoUrl}
      </td>
      <td className="even">
        <div className="delete" onClick={handleDeleteEvent}>
          <img src={ic_close} className="deleteImage" alt="삭제" />
        </div>
      </td>
    </tr>
  );
};

export default EventRow;
