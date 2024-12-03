import { Header } from "@/components/layout/Header";
import { auth } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function EventsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (userId === null) return redirectToSignIn();

  //   const events = await DevBundlerService.query.EventTable.findMany({})

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <h1>Events Page</h1>
      </main>
    </>
  );
}
