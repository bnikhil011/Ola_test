import Cordinate from "./Cordinate";

interface Group {
  groupName: string;
  id?: string;
  adminName?: string;
  destination: Cordinate;
}

export default Group;
