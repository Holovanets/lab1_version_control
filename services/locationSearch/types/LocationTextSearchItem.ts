export type LocationTextSearchItem = {
  formatted_address: string,
  geometry:{
    location: {
      lat: number,
      lng: number
    }
  }
  icon: string
  name: string
  place_id: string
}