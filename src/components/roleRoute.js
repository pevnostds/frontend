import { useSelector } from "react-redux";
import { NotFound } from "./notfound";

export const RoleRoute = ({ role, children }) => {
  const { user } = useSelector((state) => state.cekTokenReducer);
  const userRole = user ? user.role : null;

  if (userRole === role) {
    return children;
  } else {
    return <NotFound/>;
  }
};
