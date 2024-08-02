import MemberDistance from "./MemberDistance";

interface GroupMemberResponse {
  groupId: string;
  groupName: string;
  memberDistances: MemberDistance[];
  memberID: string;
}
export default GroupMemberResponse;
