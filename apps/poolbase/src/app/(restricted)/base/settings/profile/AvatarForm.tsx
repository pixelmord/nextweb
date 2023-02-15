'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import type { Database } from 'src/types/supabase';
import { buttonStyle } from 'ui/client-only';

import { useUpdateProfile, useUserProfile } from '@/lib/api';
import supabase from '@/lib/supabaseBrowserClient';

type Profiles = Database['public']['Tables']['profiles']['Row'];
export default function AvatarFormWrapper({ user }: { user: Profiles }) {
  const { data, isLoading, isIdle, isError } = useUserProfile({ initialData: user });
  if (isLoading || isIdle) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return <AvatarForm user={data} />;
}
function AvatarForm({ user }: { user?: Profiles }) {
  const { id: uid, avatar_url: avatarUrl } = user;
  const [uploading, setUploading] = useState(false);
  const mutation = useUpdateProfile();

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];

      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`public/${filePath}`, file, { upsert: true });
      const {
        data: { publicUrl: url },
      } = await supabase.storage.from('avatars').getPublicUrl(`public/${filePath}`);

      if (uploadError) {
        throw uploadError;
      }
      mutation.mutate({ ...user, avatar_storage_path: `public/${filePath}`, avatar_url: url });
    } catch (error) {
      console.log(error);
      setUploading(false);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="mb-6 rounded-full border border-pink-900 bg-gray-400"
          width={160}
          height={160}
        />
      ) : (
        <div className="mb-6 rounded-full border border-pink-900 bg-gray-400 w-40 h-40" />
      )}
      <div className="w-40">
        <label
          className={buttonStyle({ intent: 'secondary', size: 'medium', className: 'block text-center' })}
          htmlFor="single"
        >
          {uploading ? 'Uploading ...' : 'Select new avatar image'}
        </label>
        <input
          className="sr-only absolute"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
