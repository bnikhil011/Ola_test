import { useForm, SubmitHandler } from "react-hook-form";
import Group from "../model/Group";
import Cordinate from "../model/Cordinate";
import {
  createGroupService,
  getLocationSuggestions,
} from "../services/GroupService";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useState } from "react";
import Location from "../model/Location";

export type GroupDetails = {
  name: string;
  adminName: string;
  destination: Cordinate;
};

const CreateGroup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<GroupDetails>();

  const handleInputChange = async (event: any, newInputValue: string) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      const locations = await getLocationSuggestions(newInputValue);
      setSuggestions(locations);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (event: any, value: Location | null) => {
    if (value) {
      setValue("destination", value.cordinate);
    } else {
      setValue("destination", { lat: "", lng: "" });
    }
  };

  const onSubmit: SubmitHandler<GroupDetails> = async (data) => {
    let group: Group = {
      groupName: data.name,
      adminName: data.adminName,
      destination: data.destination,
    };
    const createGroupRes = await createGroupService(group);
    if (createGroupRes != null) {
      navigate("/group", { state: { group: createGroupRes } });
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="display-3 center text-primary">
          <b>Create Group</b>
        </h1>
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="groupCordinate" className="form-label">
              Destination
            </label>
            <Autocomplete
              options={suggestions}
              getOptionLabel={(option) => option.name}
              onInputChange={handleInputChange}
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination Coordinate"
                  variant="outlined"
                  error={!!errors.destination}
                  helperText={errors.destination?.message}
                  // Manually set the value of the TextField to inputValue to ensure it reflects changes correctly
                  value={inputValue}
                />
              )}
            />
            <div id="groupCordinateHelp" className="form-text">
              {errors.destination && <span>{errors.destination.message}</span>}
            </div>
          </div>

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

          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
