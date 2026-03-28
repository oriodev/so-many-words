import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { SiteHeader } from "@/components/misc/site-header";
import { getUser } from "@/api/user.api";
import { redirect } from "next/navigation";

export default async function Profile() {

  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <div>
      <SiteHeader
        title="Edit Profile" 
        backBtnText={`Return to Profile`}
        backBtnUrl={`/profile`}
      />

      <EditProfileForm user={user} />
      
    </div>
  )
}