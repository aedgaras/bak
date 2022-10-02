import { Route, Routes } from "react-router-dom";
import { UserApp } from "./UserApp";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserApp />} />
    </Routes>
  );
};
