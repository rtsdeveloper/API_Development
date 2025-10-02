import cors from 'cors';

/**
 * CORS middleware configuration
 */
export function buildCors() {
  const origins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
    : '*';
    
  return cors({ 
    origin: origins, 
    credentials: true 
  });
}
