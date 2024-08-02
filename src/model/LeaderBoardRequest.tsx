import Cordinate from "./Cordinate";

interface LeaderBoardRequest {
  groupId: string;
  cordinate: Cordinate | null;
  memberId: string;
}

export default LeaderBoardRequest;
