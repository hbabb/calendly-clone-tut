import { EventForm } from "@/components/form/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEventPage() {
  return (
    <Card className="mx-auto mt-20 max-w-md">
      <CardHeader>
        <CardTitle>New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm />
      </CardContent>
    </Card>
  );
}
