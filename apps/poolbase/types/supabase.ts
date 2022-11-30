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
