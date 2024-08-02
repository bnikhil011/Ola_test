import React from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../utils/CommonUtil";
import Cordinate from "../model/Cordinate";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/create/group")}
      >
        Create Group
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/join/group")}
      >
        Join Group
      </button>
    </div>
  );
};

export default Home;
