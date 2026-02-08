-- Create meta_events table for idempotency (prevent duplicate CAPI calls)
CREATE TABLE public.meta_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE, -- Unique constraint for idempotency
  event_id TEXT NOT NULL,
  event_name TEXT NOT NULL DEFAULT 'Purchase',
  event_time BIGINT NOT NULL, -- Unix timestamp
  value NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'BRL',
  fbc TEXT, -- Click ID cookie
  fbp TEXT, -- Browser ID cookie
  client_ip TEXT,
  client_user_agent TEXT,
  email_hash TEXT, -- SHA256 hashed
  phone_hash TEXT, -- SHA256 hashed
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  api_response JSONB, -- Store Meta API response for debugging
  test_event_code TEXT, -- For test mode (e.g., 'TEST12345')
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meta_events ENABLE ROW LEVEL SECURITY;

-- Only service role can insert/read (edge functions only)
CREATE POLICY "Service role full access" 
ON public.meta_events 
FOR ALL 
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Index for fast lookups
CREATE INDEX idx_meta_events_order_id ON public.meta_events(order_id);
CREATE INDEX idx_meta_events_event_id ON public.meta_events(event_id);
CREATE INDEX idx_meta_events_sent_at ON public.meta_events(sent_at DESC);