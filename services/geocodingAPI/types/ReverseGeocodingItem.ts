export type ReversGeocodingItem = {
  address_components : 
    {
       long_name : string,
       short_name :string,
       types : string[]
    }[]
    formatted_address: string,
  geometry:{
    location: {
      lat: number,
      lng: number
    }
  }
  location_type: string

  place_id: string
} | undefined