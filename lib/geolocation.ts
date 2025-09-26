
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

export const getUserLocationByIP = async (): Promise<UserLocation | null> => {
  try {
    const response = await fetch('https://ipinfo.io/json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.loc) {
      throw new Error('Invalid location data received');
    }
    
    const [lat, lon] = data.loc.split(',').map(Number);
    
    if (isNaN(lat) || isNaN(lon)) {
      throw new Error('Invalid coordinates received');
    }
    
    
    return {
      latitude: lat,
      longitude: lon,
      accuracy: 10000, // IP-based location kurang akurat
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    return null;
  }
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

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

  if (minDistance > 500) {
    return null;
  }
  return nearestBranch;
};

export const getUserLocationWithFallback = async (): Promise<{
  location: UserLocation | null;
  nearestBranch: string | null;
  method: 'ip' | 'none';
}> => {
  try {
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
  }
  
  return {
    location: null,
    nearestBranch: null,
    method: 'none',
  };
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

export const getDirectionsUrl = (branchName: string): string => {
  const branch = BRANCH_LOCATIONS[branchName];
  if (!branch) return '#';
  
  return `https://www.google.com/maps/dir/?api=1&destination=${branch.latitude},${branch.longitude}`;
};
