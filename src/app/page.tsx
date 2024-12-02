import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
// import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="mx-auto flex flex-1 flex-col items-center justify-center">
        <Card className="flex flex-col items-center justify-center">
          <CardHeader className="flex flex-col items-center">
            <h1 className="mb-4 text-3xl">My Calendly App</h1>
            <CardDescription>
              <p>Please use the links below to get started with a calendly event</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center gap-2">
            <Button>{/* <SignInButton /> */}Sign In</Button>
            <Button>Sign Up</Button>
          </CardContent>
          <CardFooter>
            <p>Hope to hear from you soon!</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
