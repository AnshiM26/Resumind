import { CalendarFold, MapPin, SquarePen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface JobCardsProps {
  CompanyName: string;
  CompanyWebsite: string;
  ApplyLink: string;
  PostedAt: string;
  city: string;
  country: string;
}
export default function JobCards({
  CompanyName,
  CompanyWebsite,
  ApplyLink,
  PostedAt,
  city,
  country,
}: JobCardsProps) {
  return (
    <>
      <Card>
        <CardHeader className="text-lg text-bold">
          <CardTitle>{CompanyName}</CardTitle>
          <a
            href={CompanyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Visit Company Website
          </a>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-row gap-2">
              <SquarePen className="size-5" />
              <a
                href={ApplyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Apply here
              </a>
            </div>
            <div className="flex flex-row gap-2">
              <CalendarFold className="size-5" />
              <p>{PostedAt}</p>
            </div>
            <div className="flex flex-row">
              <MapPin className="size-5" />
              <div className="flex w-full items-center justify-between">
                <div>{city}</div>
                <div>{country}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
