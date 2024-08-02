import GroupMemberResponse from "../model/GroupMemberResponse";
import { useLocation } from "react-router-dom";
import {
  getCurrentCoordinates,
  getFromLocalStorage,
  useGeolocation,
} from "../utils/CommonUtil";
import Cordinate from "../model/Cordinate";
import { useEffect, useState } from "react";
import LeaderBoardRequest from "../model/LeaderBoardRequest";
import { getUpdatedLeaderBordCall } from "../services/GroupService";

const LeaderBoardScreen = () => {
  const location = useLocation();

  const { groupMemberResponse } = location.state;
  const [groupMemberDetails, updateLeaderBoardDetails] =
    useState<GroupMemberResponse | null>(groupMemberResponse);

  const getUpdatedLeaderBoard = async () => {
    const request: LeaderBoardRequest = {
      groupId: getFromLocalStorage("groupId"),
      memberId: getFromLocalStorage("memberId"),
      cordinate: await getCurrentCoordinates(),
    };
    const response: GroupMemberResponse | null = await getUpdatedLeaderBordCall(
      request
    );
    updateLeaderBoardDetails(response);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUpdatedLeaderBoard();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const metertokiloMeter = (meters: number): string => {
    const kilometers = Math.floor(meters / 1000);
    const remainingMeters = meters % 1000;
    return `${kilometers} km and ${remainingMeters.toFixed(2)} meters`;
  };

  return (
    <div className="container">
      <h3 className="display-3  text-warning-emphasis">RANKING</h3>
      <ol className="list-group">
        {groupMemberDetails?.memberDistances.map((element, index) => (
          <li key={element.memberId} className="list-group-item">
            <b>{index + 1}. </b>
            {element.memberName} is{" "}
            {metertokiloMeter(Math.abs(element.distance))} meter
            {element.distance > 0 ? " from Destination" : " behind"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LeaderBoardScreen;
