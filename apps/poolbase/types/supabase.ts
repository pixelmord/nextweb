export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      integrations: {
        Row: {
          id: number
          created_at: string | null
          access_token: string | null
          display_name: string | null
          api_url: string | null
          provider: string | null
          api_username: string | null
          uid: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          access_token?: string | null
          display_name?: string | null
          api_url?: string | null
          provider?: string | null
          api_username?: string | null
          uid?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          access_token?: string | null
          display_name?: string | null
          api_url?: string | null
          provider?: string | null
          api_username?: string | null
          uid?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      resources: {
        Row: {
          id: number
          created_at: string | null
          creator: string | null
          url: string
          title: string | null
          status: number | null
          meta_keywords: string[] | null
          meta_description: string | null
          meta_title: string | null
          meta_author: string | null
          meta_publisher: string | null
          main_text: string | null
          meta_icon_url: string | null
          main_image_url: string | null
          screenshot_preview_url: string | null
          screenshot_full_url: string | null
          processed: number | null
          magic_tags: string[] | null
          magic_summary: string | null
          provider: string | null
          provider_channel: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          creator?: string | null
          url: string
          title?: string | null
          status?: number | null
          meta_keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          meta_author?: string | null
          meta_publisher?: string | null
          main_text?: string | null
          meta_icon_url?: string | null
          main_image_url?: string | null
          screenshot_preview_url?: string | null
          screenshot_full_url?: string | null
          processed?: number | null
          magic_tags?: string[] | null
          magic_summary?: string | null
          provider?: string | null
          provider_channel?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          creator?: string | null
          url?: string
          title?: string | null
          status?: number | null
          meta_keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          meta_author?: string | null
          meta_publisher?: string | null
          main_text?: string | null
          meta_icon_url?: string | null
          main_image_url?: string | null
          screenshot_preview_url?: string | null
          screenshot_full_url?: string | null
          processed?: number | null
          magic_tags?: string[] | null
          magic_summary?: string | null
          provider?: string | null
          provider_channel?: string | null
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
  }
}
