import { JoinGroupI } from "../component/JoinGroup";
import Group from "../model/Group";
import GroupMemberResponse from "../model/GroupMemberResponse";
import LeaderBoardRequest from "../model/LeaderBoardRequest";

// const backendUrl = "http://localhost:8092";
const backendUrl = "https://00df-152-58-93-146.ngrok-free.app";

export const createGroupService = async (group: Group) => {
  try {
    const res = await fetch(backendUrl + "/create/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const joinGroup = async (group: JoinGroupI) => {
  try {
    const res = await fetch(backendUrl + "/join/group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(group),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log(data);
    return data as GroupMemberResponse;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUpdatedLeaderBordCall = async (
  request: LeaderBoardRequest
): Promise<GroupMemberResponse | null> => {
  try {
    const res = await fetch(backendUrl + "/getmemberdistance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    console.log(data);
    return data as GroupMemberResponse;
  } catch (err) {
    console.log(err);
    return null;
  }
};
