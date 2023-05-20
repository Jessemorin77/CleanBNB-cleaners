import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxfmzfhqkuxbmalsxqwo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4Zm16Zmhxa3V4Ym1hbHN4cXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ1MjYwODgsImV4cCI6MjAwMDEwMjA4OH0.uw3tJ-Er65bfC300Hk76lkT9CcygYSsruCJMFtDVrJY';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


