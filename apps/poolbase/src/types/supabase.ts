export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      integrations: {
        Row: {
          access_token: string | null
          api_url: string | null
          api_username: string | null
          created_at: string | null
          display_name: string | null
          id: string
          provider: string | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          access_token?: string | null
          api_url?: string | null
          api_username?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          provider?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          access_token?: string | null
          api_url?: string | null
          api_username?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          provider?: string | null
          uid?: string | null
          updated_at?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_storage_path: string | null
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_storage_path?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_storage_path?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      resource_tag: {
        Row: {
          created_at: string | null
          id: string
          resource_id: string | null
          tag_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          resource_id?: string | null
          tag_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          resource_id?: string | null
          tag_id?: string | null
        }
      }
      resource_user: {
        Row: {
          created_at: string | null
          id: string
          resource_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          resource_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          resource_id?: string | null
          user_id?: string | null
        }
      }
      resources: {
        Row: {
          created_at: string | null
          creator: string | null
          id: string
          magic_summary: string | null
          magic_tags: string[] | null
          main_image_url: string | null
          main_text: string | null
          meta_author: string | null
          meta_description: string | null
          meta_icon_url: string | null
          meta_keywords: string[] | null
          meta_publisher: string | null
          meta_title: string | null
          processed: string[] | null
          provider: string | null
          provider_channel: string | null
          screenshot_full_url: string | null
          screenshot_storage_path: string | null
          status: number | null
          title: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          creator?: string | null
          id?: string
          magic_summary?: string | null
          magic_tags?: string[] | null
          main_image_url?: string | null
          main_text?: string | null
          meta_author?: string | null
          meta_description?: string | null
          meta_icon_url?: string | null
          meta_keywords?: string[] | null
          meta_publisher?: string | null
          meta_title?: string | null
          processed?: string[] | null
          provider?: string | null
          provider_channel?: string | null
          screenshot_full_url?: string | null
          screenshot_storage_path?: string | null
          status?: number | null
          title?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          creator?: string | null
          id?: string
          magic_summary?: string | null
          magic_tags?: string[] | null
          main_image_url?: string | null
          main_text?: string | null
          meta_author?: string | null
          meta_description?: string | null
          meta_icon_url?: string | null
          meta_keywords?: string[] | null
          meta_publisher?: string | null
          meta_title?: string | null
          processed?: string[] | null
          provider?: string | null
          provider_channel?: string | null
          screenshot_full_url?: string | null
          screenshot_storage_path?: string | null
          status?: number | null
          title?: string | null
          updated_at?: string | null
          url?: string
        }
      }
      scope_tag: {
        Row: {
          created_at: string | null
          id: string
          scope_id: string | null
          tag_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          scope_id?: string | null
          tag_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          scope_id?: string | null
          tag_id?: string | null
        }
      }
      scopes: {
        Row: {
          created_at: string | null
          id: string
          image_storage_path: string | null
          image_url: string | null
          title: string | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          image_storage_path?: string | null
          image_url?: string | null
          title?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          title?: string | null
          uid?: string | null
          updated_at?: string | null
        }
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          image_storage_path: string | null
          image_url: string | null
          title: string | null
          uid: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          image_storage_path?: string | null
          image_url?: string | null
          title?: string | null
          uid?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          title?: string | null
          uid?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

