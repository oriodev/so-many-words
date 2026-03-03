import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/app/api/user.api";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
    const user = await getUser();
    if (!user) redirect('/login');

    const { yearlyWordGoal, monthlyWordGoal, weeklyWordGoal } = user;

  return (
    <div>
      <SiteHeader title="Profile" />

      <div className="p-10 flex flex-col gap-5">

        <Card className="@container/card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              Wordcount Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p><b>Yearly:</b> { yearlyWordGoal.toLocaleString() } Words</p>
            <p><b>Monthly:</b> { monthlyWordGoal.toLocaleString() } Words</p>
            <p><b>Weekly:</b> { weeklyWordGoal.toLocaleString() } Words</p>
          </CardContent>
        </Card>

        <Link href={'/profile/edit'}>
          <Button>Edit Profile</Button>
        </Link>

      </div>
      
      
    </div>
  )
}