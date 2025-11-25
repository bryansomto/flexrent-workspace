import { Box } from "@mui/material";
import { getLoggedInUser } from "../../../lib/actions";
import Verification from "./verify";

export default async function VerificationPage() {
  const userData = await getLoggedInUser();

  return (
    <Box>
      <Verification />
    </Box>
  );
}
