export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      module_feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          id: string
          module_id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          module_id: string
          rating?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          id?: string
          module_id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "module_feedback_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      module_sections: {
        Row: {
          content: string
          created_at: string
          id: string
          module_id: string
          order_index: number
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          module_id: string
          order_index: number
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          module_id?: string
          order_index?: number
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_sections_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          estimated_minutes: number
          id: string
          image_url: string | null
          title: string
          updated_at: string
          xp_reward: number
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          estimated_minutes: number
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          xp_reward: number
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          estimated_minutes?: number
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          xp_reward?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      section_questions: {
        Row: {
          correct_answer: Json
          created_at: string
          id: string
          options: Json | null
          order_index: number
          question_text: string
          question_type: string
          section_id: string
        }
        Insert: {
          correct_answer: Json
          created_at?: string
          id?: string
          options?: Json | null
          order_index: number
          question_text: string
          question_type: string
          section_id: string
        }
        Update: {
          correct_answer?: Json
          created_at?: string
          id?: string
          options?: Json | null
          order_index?: number
          question_text?: string
          question_type?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_questions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "module_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          awarded_at: string
          certificate_url: string | null
          description: string
          id: string
          module_id: string | null
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          awarded_at?: string
          certificate_url?: string | null
          description: string
          id?: string
          module_id?: string | null
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          awarded_at?: string
          certificate_url?: string | null
          description?: string
          id?: string
          module_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          completion_percentage: number
          created_at: string
          id: string
          is_completed: boolean
          last_accessed: string
          module_id: string
          section_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_percentage?: number
          created_at?: string
          id?: string
          is_completed?: boolean
          last_accessed?: string
          module_id: string
          section_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_percentage?: number
          created_at?: string
          id?: string
          is_completed?: boolean
          last_accessed?: string
          module_id?: string
          section_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "module_sections"
            referencedColumns: ["id"]
          },
        ]
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
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
