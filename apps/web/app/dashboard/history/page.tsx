import Transactions from "./transactions";
import { Box } from "@mui/material";
import { getLoggedInUser } from "../../../lib/actions";

export default async function TransactionsPage() {
  const userData = await getLoggedInUser();

  return (
    <Box>
      <Transactions
        accounts={userData?.accounts || []}
        transactions={userData?.transactions || []}
      />
    </Box>
  );
}
