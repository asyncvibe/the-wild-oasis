import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow: scroll;
`;
const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;
const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;
function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;
{
	/* to appear pages of the same styles we put the Outlet in the main */
}
// defing puropse of layou component:
// 1. to add header and footer
// 2. to add sidebar and main content
// 3. to add navbar and outlet
// 4. to add global styles
// 5. to add global context
// we also define grid layout.

// the components we want to change in the layout are wrapped in the <Outlet /> component
// the <Outlet /> component is a placeholder for the nested routes in the layout component
// the nested routes are defined in the layout component
// the layout component is the parent route for the nested routes
