import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import ProfileForm from './ProfileForm';

// export const revalidate = 3600;
// async function getUser() {
//   const headersInstance = headers();
//   const userId = headersInstance.get('supabase-user-id');
//   // eslint-disable-next-line turbo/no-undeclared-env-vars
//   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
//   // Check if we have a session

//   // // Run queries with RLS on the server
//   const { data } = await supabase.from('profiles').select(`*`).eq('id', userId).single();
//   console.log(data, userId);
//   return { data };
// }
export default async function ProfilePage() {
  // const headersInstance = headers();
  // const userId = headersInstance.get('supabase-user-id');
  // const data = await getUser();
  // console.log(userId);
  return <ProfileForm />;
}
