import Cordinate from "../model/Cordinate";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCurrentCoordinates, saveToLocalStorage } from "../utils/CommonUtil";
import { joinGroup } from "../services/GroupService";
import { useNavigate } from "react-router-dom";
export type JoinGroupI = {
  groupId: string;
  cordinate: Cordinate;
  userName: string;
};

const JoinGroup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinGroupI>();

  const parseDestination = (cordinateString: string): Cordinate => {
    const [lat, lng] = cordinateString.split(",");
    return { lat, lng };
  };
  const onSubmit: SubmitHandler<JoinGroupI> = async (data) => {
    data.cordinate = await getCurrentCoordinates();
    const response = await joinGroup(data);
    if (response != null) {
      saveToLocalStorage("groupId", response.groupId);
      saveToLocalStorage("memberId", response.memberID);
      navigate("/leaderboard", { state: { groupMemberResponse: response } });
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="display-3 center text-primary">
          <b>Join Group</b>
        </h1>
        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="groupId" className="form-label">
              Group Id
            </label>
            <input
              className="form-control"
              id="groupId"
              aria-describedby="groupIdHelp"
              {...register("groupId", {
                required: "Group Id is required",
              })}
            />
            <div id="groupIdHelp" className="form-text">
              {errors.groupId && <span>{errors.groupId.message}</span>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              className="form-control"
              id="userName"
              aria-describedby="userNameHelp"
              {...register("userName", {
                required: "User Name is required",
                minLength: {
                  value: 5,
                  message: "UserName must be at least 5 characters long",
                },
              })}
            />
            <div id="userNameHelp" className="form-text">
              {errors.userName && <span>{errors.userName.message}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Join
          </button>
        </form>
      </div>
    </>
  );
};

export default JoinGroup;
