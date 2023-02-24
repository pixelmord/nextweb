import { Container, H1 } from 'ui';

import PageHeader from '@/components/PageHeader';

import AvatarForm from './AvatarForm';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  return (
    <>
      <PageHeader>
        <H1>Edit your Profile</H1>
      </PageHeader>
      <Container>
        <AvatarForm />
        <ProfileForm />
      </Container>
    </>
  );
}
