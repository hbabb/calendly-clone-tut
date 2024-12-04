import { CopyEventButton } from "@/components/CopyEventButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { formatEventDescription } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
      <CardHeader className={cn(!isActive && "opacity-50")}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatEventDescription(durationInMinutes)}</CardDescription>
      </CardHeader>
      {description !== null && (
        <CardContent className={cn(!isActive && "opacity-50")}>{description}</CardContent>
      )}
      <CardFooter className="mt-auto flex justify-end gap-2">
        {isActive && <CopyEventButton variant="outline" eventId={id} clerkUserId={clerkUserId} />}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export const revalidate = 0;

export default async function EventsPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const events = await db.query.EventTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });

  return (
    <div className="mt-20 flex h-full flex-col items-center justify-center px-4">
      {/* Page title and new event button */}
      <div className="mb-6 flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl">Events</h1>
        <Button size="lg" asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-2 size-6" /> New Event
          </Link>
        </Button>
      </div>

      {/* Events Card */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            {events.length > 0
              ? "Manage your events below"
              : "No events found. Start by creating your first event."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-96">
            {events.length > 0 ? (
              <div className="grid gap-4">
                {events.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarRange className="mb-4 size-12" />
                <p>You don&apos;t have any events yet.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
