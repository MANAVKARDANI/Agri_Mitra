ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expiry BIGINT;

UPDATE users
SET reset_token = COALESCE(reset_token, reset_token_hash),
    reset_token_expiry = COALESCE(
      reset_token_expiry,
      FLOOR(EXTRACT(EPOCH FROM reset_token_expires_at) * 1000)::BIGINT
    )
WHERE reset_token_hash IS NOT NULL;
