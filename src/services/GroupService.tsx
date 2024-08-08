import { JoinGroupI } from "../component/JoinGroup";
import Group from "../model/Group";
import GroupMemberResponse from "../model/GroupMemberResponse";
import LeaderBoardRequest from "../model/LeaderBoardRequest";
import Location from "../model/Location";

// const backendUrl = "http://localhost:8092";
const backendUrl = "https://riderop-backend.onrender.com";

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

    return data;
  } catch (err) {
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

    return data as GroupMemberResponse;
  } catch (err) {
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

    return data as GroupMemberResponse;
  } catch (err) {
    return null;
  }
};

export const getLocationSuggestions = async (locationName: string) => {
  try {
    const res = await fetch(backendUrl + "/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: locationName }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();

    return data as Location[];
  } catch (err) {
    return [];
  }
};
