import { useUserContext } from '../../providers/UserProvider';
import { Role } from '../../utils/Models';
import { PageNotFound, Unauthorized } from '../errors';

export function ProtectedRoute({ children }: any) {
    const { state } = useUserContext();
    return state.loggedIn === true ? children : <Unauthorized />;
}

export function DisabledAfterLoginRoute({ children }: any) {
    const { state } = useUserContext();
    return state.loggedIn !== true ? children : <PageNotFound />;
}

export function RoleRoute({
    children,
    authorizedRoles,
}: {
    children: any;
    authorizedRoles: Role[];
}) {
    const { state } = useUserContext();

    return authorizedRoles.includes(state.role!) ? children : <Unauthorized />;
}
