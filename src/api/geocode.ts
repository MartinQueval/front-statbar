// Geocoding via Photon (Komoot) — free, no API key, OpenStreetMap-based.
// Results are biased and bounded to the Rouen area.

export const ROUEN_LAT = 49.4431;
export const ROUEN_LNG = 1.0993;
// bbox = minLon,minLat,maxLon,maxLat — covers Rouen + close agglomeration.
export const ROUEN_BBOX = '0.95,49.36,1.22,49.52';

export interface PlaceSuggestion {
  id: string;
  /** Display label: name + context (street / city) to disambiguate homonyms. */
  label: string;
  /** Place name only — used to prefill the bar name. */
  name: string;
  lat: number;
  lng: number;
}

interface PhotonFeature {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    osm_id?: number;
    name?: string;
    street?: string;
    housenumber?: string;
    city?: string;
    postcode?: string;
  };
}

function buildLabel(name: string, p: NonNullable<PhotonFeature['properties']>): string {
  const parts: string[] = [];
  const street = [p.housenumber, p.street].filter(Boolean).join(' ');
  if (street) parts.push(street);
  if (p.city) parts.push(p.city);
  const context = parts.join(', ');
  return context ? `${name} — ${context}` : name;
}

export async function searchPlaces(query: string): Promise<PlaceSuggestion[]> {
  const q = query.trim();
  if (q.length < 3) return [];

  const url =
    `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}` +
    `&lat=${ROUEN_LAT}&lon=${ROUEN_LNG}&bbox=${ROUEN_BBOX}&limit=5&lang=fr`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = (await res.json()) as { features?: PhotonFeature[] };

    return (data.features ?? [])
      .map((f, idx): PlaceSuggestion | null => {
        const coords = f.geometry?.coordinates;
        const props = f.properties;
        if (!coords || !props) return null;
        const [lng, lat] = coords;
        if (typeof lat !== 'number' || typeof lng !== 'number') return null;
        const name = props.name ?? props.street ?? q;
        return {
          id: `${props.osm_id ?? 'x'}-${idx}`,
          name,
          label: buildLabel(name, props),
          lat: Number(lat.toFixed(6)),
          lng: Number(lng.toFixed(6)),
        };
      })
      .filter((s): s is PlaceSuggestion => s !== null);
  } catch {
    // Network/parse error — fail soft, no suggestions.
    return [];
  }
}
