import React from "react";
import ic_close from "../../../assets/admin/ic_close_black.png";

const EventRow = ({ event }) => {
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
        <div className="delete">
          <img src={ic_close} className="deleteImage" alt="삭제" />
        </div>
      </td>
    </tr>
  );
};

export default EventRow;
