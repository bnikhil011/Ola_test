import CreateGroup from "./component/CreateGroup";
import Home from "./component/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinGroup from "./component/JoinGroup";
import LeaderBoardScreen from "./component/LeaderBoardScreen";
import GroupDetail from "./component/GroupDetail";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/create/group",
      element: <CreateGroup />,
    },
    {
      path: "/join/group",
      element: <JoinGroup />,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoardScreen />,
    },
    {
      path: "/group",
      element: <GroupDetail />,
    },
  ]);
  return (
    <>
      <h1 className="center">Rider OP</h1>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
