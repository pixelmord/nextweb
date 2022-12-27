import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { fetchUserProfile } from '@/lib/ssrApi';

import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const user = await fetchUserProfile();
  return (
    <>
      <PageHeader>
        <H1>Edit your Profile</H1>
      </PageHeader>
      <Container>{!!user && <ProfileForm user={user} />}</Container>
    </>
  );
}
