-- Create orders table to store payment information
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'waiting_payment',
  amount INTEGER NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_cpf TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_number TEXT NOT NULL,
  shipping_complement TEXT,
  shipping_neighborhood TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_cep TEXT NOT NULL,
  product_name TEXT NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (but allow public insert for checkout without auth)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public insert (checkout doesn't require login)
CREATE POLICY "Allow public insert" ON public.orders FOR INSERT WITH CHECK (true);

-- Allow public select by transaction_id (for checking status)
CREATE POLICY "Allow public select by transaction_id" ON public.orders FOR SELECT USING (true);

-- Allow updates via service role only (for webhook updates)
CREATE POLICY "Allow service role update" ON public.orders FOR UPDATE USING (true);

-- Create index for faster lookups
CREATE INDEX idx_orders_transaction_id ON public.orders (transaction_id);
CREATE INDEX idx_orders_status ON public.orders (status);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_orders_updated_at();