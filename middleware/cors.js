import cors from 'cors';

function buildCors() {
  const origins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
    : '*';
  return cors({ origin: origins, credentials: true });
}

export { buildCors };


