import { createClient } from "@supabase/supabase-js";

export const supabase=createClient(
    "https://tayvyzvbyigtxsjkvclz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRheXZ5enZieWlndHhzamt2Y2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTE3NTcsImV4cCI6MjA3NzY4Nzc1N30.Kvs7bcdN7V5uPWxeBVlrDP-EIwUjZQzp4ICFIzPnBOQ"
)