import { getUserId } from "@/lib/db/db";
import { auth } from "../../../auth";
import PageLayout from "./pageLayout";

const PageLayoutWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session:any = await auth();
  const id = await getUserId(session?.user?.email)
  return <PageLayout session={session} id={id}>{children}</PageLayout>;
};

export default PageLayoutWrapper;