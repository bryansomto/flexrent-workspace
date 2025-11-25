import { Box } from "@mui/material";
import Accounts from "./accounts";
import { getLoggedInUser } from "../../../lib/actions";

export default async function AccountsPage() {
  const userData = await getLoggedInUser();

  return (
    <Box>
      <Accounts
        accounts={userData?.accounts || []}
        transactions={userData?.transactions || []}
        annualRent={userData?.tenantProfile?.currentRent ?? 0}
      />
    </Box>
  );
}
