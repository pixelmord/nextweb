import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';
import { fetchUserProfile } from '@/lib/ssrApi';

import AvatarForm from './AvatarForm';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const { data: user } = await fetchUserProfile();
  return (
    <>
      <PageHeader>
        <H1>Edit your Profile</H1>
      </PageHeader>
      <Container>
        {!!user && (
          <>
            <AvatarForm user={user} />
            <ProfileForm user={user} />
          </>
        )}
      </Container>
    </>
  );
}
