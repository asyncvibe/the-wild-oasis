import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	//1. load the authenticated user
	const { isPending, isAuthenticated } = useUser();
	const navigate = useNavigate();
	// 3. if no user, redirect to login
	// as useNavigate cannot be use at top level in the function, we will use useEffect. useEffect runs after mount. if condition cannot be used before it.
	useEffect(
		function () {
			if (!isAuthenticated && !isPending) navigate("/login");
		},
		[isAuthenticated, navigate, isPending]
	);
	// 2. while loading show spinner
	if (isPending)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. if there is a user, render the protected route
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
