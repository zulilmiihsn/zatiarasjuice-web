// Geolocation utilities untuk UX berbasis lokasi

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  city?: string;
  region?: string;
}

export interface BranchLocation {
  name: string;
  latitude: number;
  longitude: number;
  city: string;
  region: string;
}

// Koordinat cabang Zatiaras Juice
export const BRANCH_LOCATIONS: Record<string, BranchLocation> = {
  berau: {
    name: 'Zatiaras Juice Berau',
    latitude: -2.1872,
    longitude: 117.3703,
    city: 'Berau',
    region: 'Kalimantan Timur',
  },
  samarinda: {
    name: 'Zatiaras Juice Samarinda',
    latitude: -0.5021,
    longitude: 117.1536,
    city: 'Samarinda',
    region: 'Kalimantan Timur',
  },
};

// Function untuk mendapatkan lokasi user melalui browser geolocation API
export const getUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung oleh browser ini'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 menit
      }
    );
  });
};

// Function untuk mendapatkan lokasi user melalui IP fallback
export const getUserLocationByIP = async (): Promise<UserLocation | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      accuracy: 10000, // IP-based location kurang akurat
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    console.error('Error getting location by IP:', error);
    return null;
  }
};

// Function untuk menghitung jarak antara dua koordinat (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Function untuk mendapatkan cabang terdekat
export const getNearestBranch = (userLocation: UserLocation): string | null => {
  let nearestBranch: string | null = null;
  let minDistance = Infinity;

  Object.entries(BRANCH_LOCATIONS).forEach(([branchName, branchLocation]) => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      branchLocation.latitude,
      branchLocation.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestBranch = branchName;
    }
  });

  return nearestBranch;
};

// Function untuk mendapatkan lokasi user dengan fallback
export const getUserLocationWithFallback = async (): Promise<{
  location: UserLocation | null;
  nearestBranch: string | null;
  method: 'geolocation' | 'ip' | 'none';
}> => {
  try {
    // Coba geolocation browser terlebih dahulu
    const location = await getUserLocation();
    const nearestBranch = getNearestBranch(location);
    
    return {
      location,
      nearestBranch,
      method: 'geolocation',
    };
  } catch (error) {
    console.log('Geolocation failed, trying IP fallback...');
    
    try {
      // Fallback ke IP-based location
      const location = await getUserLocationByIP();
      if (location) {
        const nearestBranch = getNearestBranch(location);
        return {
          location,
          nearestBranch,
          method: 'ip',
        };
      }
    } catch (ipError) {
      console.error('IP fallback also failed:', ipError);
    }

    // Jika semua gagal, return null
    return {
      location: null,
      nearestBranch: null,
      method: 'none',
    };
  }
};

// Function untuk format jarak
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

// Function untuk mendapatkan arah ke cabang (Google Maps)
export const getDirectionsUrl = (branchName: string): string => {
  const branch = BRANCH_LOCATIONS[branchName];
  if (!branch) return '#';
  
  return `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
};
