import { NextApiRequest, NextApiResponse } from 'next';

// API endpoint untuk revalidate ISR ketika data Supabase berubah
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Cek method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Cek secret key untuk security
  const secret = req.headers['x-secret-key'];
  if (secret !== process.env.REVALIDATE_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid secret key' });
  }

  try {
    const { branch, paths } = req.body;

    // Revalidate halaman berdasarkan branch
    if (branch) {
      // Revalidate halaman cabang
      await res.revalidate(`/${branch}`);
      await res.revalidate(`/${branch}/menu`);
      
      // Revalidate homepage jika ada perubahan
      await res.revalidate('/');
    }

    // Revalidate paths spesifik jika ada
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        await res.revalidate(path);
      }
    }

    return res.json({ 
      revalidated: true, 
      timestamp: new Date().toISOString(),
      branch,
      paths: paths || []
    });
  } catch (error) {
    // Log error untuk debugging (bisa dihapus di production)
    // console.error('Error revalidating:', error);
    return res.status(500).json({ 
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
