export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      purchases: {
        Row: {
          id: string;
          user_id: string;
          level: string;
          payment_id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          level: string;
          payment_id: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          level?: string;
          payment_id?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "purchases_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      topics: {
        Row: {
          id: string;
          level: string;
          topic: string;
        };
        Insert: {
          id?: string;
          level: string;
          topic: string;
        };
        Update: {
          id?: string;
          level?: string;
          topic?: string;
        };
        Relationships: [];
      };
      cases: {
        Row: {
          id: string;
          level: string;
          case_name: string;
          short_description: string | null;
        };
        Insert: {
          id?: string;
          level: string;
          case_name: string;
          short_description?: string | null;
        };
        Update: {
          id?: string;
          level?: string;
          case_name?: string;
          short_description?: string | null;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          id: string;
          level: string;
          case_name: string;
          prompt: string;
          options: Json;
          correct_index: number;
          analysis: string | null;
        };
        Insert: {
          id?: string;
          level: string;
          case_name: string;
          prompt: string;
          options?: Json;
          correct_index: number;
          analysis?: string | null;
        };
        Update: {
          id?: string;
          level?: string;
          case_name?: string;
          prompt?: string;
          options?: Json;
          correct_index?: number;
          analysis?: string | null;
        };
        Relationships: [];
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          level: string;
          topic: string;
          completed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          level: string;
          topic: string;
          completed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          level?: string;
          topic?: string;
          completed?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          level: string;
          issued_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          level: string;
          issued_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          level?: string;
          issued_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
