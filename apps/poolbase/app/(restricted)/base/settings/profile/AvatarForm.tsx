'use client';
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';
type Profiles = Database['public']['Tables']['profiles']['Row'];
import { buttonStyle } from 'ui/client-only';
import { useProfileImage } from '@/lib/api';
import Image from 'next/image';

export default function AvatarForm({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url?: Profiles['avatar_url'];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [uploading, setUploading] = useState(false);
  const avatarUrl = useProfileImage(url);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      console.log(file);
      const fileExt = file.name.split('.').pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(`public/${filePath}`, file, { upsert: true });
      console.log(data);

      if (uploadError) {
        throw uploadError;
      }
      onUpload(`public/${filePath}`);
    } catch (error) {
      alert('Error uploading avatar!');
      console.log(error);
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
          width={size}
          height={size}
        />
      ) : (
        <div className="mb-6 rounded-full border border-pink-900 bg-gray-400" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className={buttonStyle({ intent: 'secondary', size: 'medium', className: 'block' })} htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
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
