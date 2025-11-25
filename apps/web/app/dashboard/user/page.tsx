import { Box } from "@mui/material";
import { getLoggedInUser } from "../../../lib/actions";
import UserProfilePage from "./userProfilePage";

export default async function AccountsPage() {
  const userData = await getLoggedInUser();

  return (
    <Box>
      <UserProfilePage accounts={userData?.accounts || []} />
    </Box>
  );
}
