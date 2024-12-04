import { EventForm } from "@/components/form/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const event = await db.query.EventTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) => and(eq(clerkUserId, userId), eq(id, eventId)),
  });

  if (!event) return notFound();

  return (
    <Card className="mx-auto mt-20 max-w-md">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm event={{ ...event, description: event.description || "" }} />
      </CardContent>
    </Card>
  );
}
