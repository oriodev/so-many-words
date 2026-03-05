import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { getUser } from "@/api/user.api";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Profile() {
    const user = await getUser();
    if (!user) redirect('/login');

    const { yearlyWordGoal } = user;

  return (
    <div>
      <SiteHeader title="Profile" />
      
      <div className="p-5">

        {/* TOP PROFILE SECTION */}
        <div className="flex justify-between">
          <div className="flex gap-5">
            {/* PROFILE IMAGE */}
            <div className="flex justify-center items-center w-18 h-18 border-4 border-primary rounded-full overflow-hidden">
              <Image
                src={'/avatar.png'} 
                alt="Profile Picture" 
                width={50} 
                height={50}
              />
            </div>

            <div>
              <h2 className="text-2xl">@{user.username}</h2>
              <p className="italic">Aiming for {yearlyWordGoal.toLocaleString()} words this year.</p>
            </div>

          </div>

          <Link href={'/profile/edit'}>
            <Button>Edit Profile</Button>
          </Link>
        </div>


      </div>

      
      
    </div>
  )
}