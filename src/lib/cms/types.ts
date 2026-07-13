export type AdminRole = "super_admin" | "editor" | "viewer";

export type AdminProfile = {
  user_id: string;
  email: string;
  display_name: string | null;
  role: AdminRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminSession = {
  user: {
    id: string;
    email?: string;
  };
  profile: AdminProfile;
};
