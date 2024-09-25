import { FC, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { usePlaceMenu, PlaceDishResponse } from "./usePlaceMenu";
import { scale } from "react-native-size-matters";
import PlaceDish from "./PlaceDish";
import { Colors } from "@/constants";
import { Feather } from "@expo/vector-icons";

interface IProps{
  id: number
  placeId: number
  spotName: string
}
const PlaceCategory: FC<IProps> = ({ id,placeId, spotName }) => {
  const {models,operations} = usePlaceMenu(placeId)
  const [dishes, setDishes] = useState<PlaceDishResponse['data']>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{
    setIsLoading(true);    
    try{
        operations.getDishByCategory(id).then((dish)=>setDishes(dish))
    }catch{

    }finally{      
      setIsLoading(false)
    }

  },[id,placeId])
  

if(isLoading){
  return (
    <View style={{
      padding: scale(30)
    }}>
      <ActivityIndicator size={scale(50)} style={{backgroundColor:Colors.mDark}}/>
    </View>
  )
} else{
  return dishes && dishes.length >=1 ? (
    <View  style={{width:'100%', padding: scale(15), borderRadius: scale(10)}}>
					{/* <Text style={{color:'white',fontSize:scale(20), fontWeight:'bold', marginBottom: scale(15)}}>{name}</Text> */}
					<View style={{gap:scale(10)}}>
						{dishes.map(dish =>(
              <PlaceDish placeId={placeId} catId={id} key={dish.id} spotName={spotName} {...{dish}}/>
            ))}
					</View>
		</View>
  ):
  (
    <View style={{
      paddingHorizontal: scale(15), 
      marginTop: scale(15)
    }}>
      <View style={{
      backgroundColor: Colors.mDark15,
      width: '100%',
      padding: scale(15),
      borderRadius: scale(15),
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(15)
    }}>
        <Feather name="cloud-off" size={24} color={Colors.mDark} />
        <Text style={{
          color: 'white',
          fontSize: scale(14)
        }}>Категорія порожня :(</Text>
        
      </View>
    </View>
  )
}
}
export default PlaceCategory