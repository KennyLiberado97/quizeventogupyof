-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo TEXT NOT NULL,
  email_corporativo TEXT NOT NULL,
  empresa TEXT NOT NULL,
  email_indicado TEXT,
  telefone_indicado TEXT,
  telefone_whatsapp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (anon)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow read access to authenticated users only
CREATE POLICY "Allow authenticated read access" ON leads
  FOR SELECT
  TO authenticated
  USING (true);
