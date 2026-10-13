export type FormState =
  | { error: string; success?: undefined }
  | { success: boolean; error?: undefined };
