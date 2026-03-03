import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/app/api/user.api";
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