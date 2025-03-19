import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://orcztkolkaxnuokiqtxr.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yY3p0a29sa2F4bnVva2lxdHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDUyNzEsImV4cCI6MjA1NzcyMTI3MX0.d5QefFXs53L_opaL-3lS5F7QOphSLyBrFm1MQhcfpis";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
