import DashboardLayout from "../../components/DashboardLayout";
import { getLoggedInUser } from "../../lib/actions";
import { prisma } from "../../lib/prisma";

export default async function DashboardPagesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const userData = await getLoggedInUser();

  return <DashboardLayout userData={userData}>{children}</DashboardLayout>;
}
