import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Group from "../model/Group";
import Cordinate from "../model/Cordinate";
import { createGroupService } from "../services/GroupService";
import { useNavigate } from "react-router-dom";

export type GroupDetails = {
  name: string;
  adminName: string;
  destination: string;
};

const CreateGroup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupDetails>();

  const parseDestination = (cordinateString: string): Cordinate => {
    const [lat, lng] = cordinateString.split(",");
    return { lat, lng };
  };
  const onSubmit: SubmitHandler<GroupDetails> = async (data) => {
    let group: Group = {
      groupName: data.name,
      adminName: data.adminName,
      destination: parseDestination(data.destination),
    };
    const createGroupRes = await createGroupService(group);
    createGroupRes != null &&
      navigate("/group", { state: { group: createGroupRes } });
    console.log(group); // Check if data contains name and destination
  };

  return (
    <>
      <div className="container">
        <h1 className="display-3 center text-primary">
          <b>Create Group</b>
        </h1>
        <br></br>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="groupName" className="form-label">
              Group Name
            </label>
            <input
              className="form-control"
              id="groupName"
              aria-describedby="groupNameHelp"
              {...register("name", {
                required: "Group Name is required",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters long",
                },
              })}
            />
            <div id="groupNameHelp" className="form-text">
              {errors.name && <span>{errors.name.message}</span>}
            </div>
          </div>

          {/* <div className="mb-3">
            <label htmlFor="adminName" className="form-label">
              Admin Name
            </label>
            <input
              className="form-control"
              id="adminName"
              aria-describedby="adminNameHelp"
              {...register("adminName", {
                required: "adminName  is required",
                minLength: {
                  value: 5,
                  message: "adminName must be at least 5 characters long",
                },
              })}
            />
            <div id="adminNameHelp" className="form-text">
              {errors.adminName && <span>{errors.adminName.message}</span>}
            </div>
          </div> */}

          <div className="mb-3">
            <label htmlFor="groupCordinate" className="form-label">
              Destination Coordinate
            </label>
            <input
              className="form-control"
              id="groupCordinate"
              aria-describedby="groupCordinateHelp"
              placeholder="example 28.506410,77.061221"
              {...register("destination", {
                required: "Destination Coordinate is required",
                minLength: {
                  value: 5,
                  message: "Coordinate must be at least 5 characters long",
                },
              })}
            />
            <div id="groupCordinateHelp" className="form-text">
              {errors.destination && <span>{errors.destination.message}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
