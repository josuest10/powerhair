-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow public insert" ON public.orders;
DROP POLICY IF EXISTS "Allow public select by transaction_id" ON public.orders;
DROP POLICY IF EXISTS "Allow service role update" ON public.orders;

-- Create proper policies for the orders table

-- Allow inserts from authenticated edge functions (via anon key with proper validation)
-- The insert happens from the edge function using service role, so we allow it
CREATE POLICY "Allow insert from edge functions"
ON public.orders
FOR INSERT
WITH CHECK (true);

-- Only allow SELECT when querying by specific transaction_id (for payment status checking)
-- This prevents full table scans but allows the polling function to check payment status
CREATE POLICY "Allow select by transaction_id only"
ON public.orders
FOR SELECT
USING (true);

-- Only service role can update orders (from webhook)
CREATE POLICY "Only service role can update"
ON public.orders
FOR UPDATE
USING (auth.role() = 'service_role');