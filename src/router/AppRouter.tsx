import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { PageNotFound, Unauthorized } from "../ui/components/errors";
import { LoginPage } from "../ui/pages/authentication/LoginPage";
import { RegisterPage } from "../ui/pages/authentication/RegisterPage";
import { UserCreatePage } from "../ui/pages/create/UserCreatePage";
import { ProfilePage } from "../ui/pages/details/ProfilePage";
import { UserDetailsPage } from "../ui/pages/details/UserDetailsPage";
import { UsersPage } from "../ui/pages/lists/UsersPage";
import { UserApp } from "../ui/UserApp";
import { Role } from "../utils/Models";

export const authRoutePath = "/auth";
export const usersRoutePath = "/users";
export const organizationsPath = "/organizations";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<UserApp />} />
      <Route path={authRoutePath}>
        <Route
          path={authRoutePath + "/login"}
          element={<DisabledAfterLoginRoute element={<LoginPage />} />}
        />
        <Route
          path={authRoutePath + "/register"}
          element={<DisabledAfterLoginRoute element={<RegisterPage />} />}
        />
      </Route>
      <Route
        path="profile"
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      {/* Users paths */}
      <Route path={usersRoutePath}>
        <Route
          path={usersRoutePath}
          element={<ProtectedRoute element={<UsersPage />} />}
        />
        <Route
          path={usersRoutePath + "/:userId"}
          element={<ProtectedRoute element={<UserDetailsPage />} />}
        />
        <Route
          path={usersRoutePath + "/create"}
          element={
            <ProtectedRoute
              element={
                <ProtectedRoute
                  element={
                    <RoleRoute
                      authorizedRoles={["Admin"]}
                      element={<UserCreatePage />}
                    />
                  }
                />
              }
            />
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { state } = useUserContext();
  return state.loggedIn === true ? element : <Unauthorized />;
}

function DisabledAfterLoginRoute({ element }: { element: JSX.Element }) {
  const { state } = useUserContext();
  return state.loggedIn !== true ? element : <PageNotFound />;
}

function RoleRoute({
  element,
  authorizedRoles,
}: {
  element: JSX.Element;
  authorizedRoles: Role[];
}) {
  const { state } = useUserContext();

  return authorizedRoles.includes(state.role!) ? element : <Unauthorized />;
}
