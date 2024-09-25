import { Colors } from "@/constants"
import { useCart } from "@/context"
import { DishItem, formatPrice, getItemInfo } from "@/services"
import { FC, useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import { scale } from "react-native-size-matters"
import CartItemIncrementer from "./CartItemIncrementer"
import {getAdditivesInfo, Dish} from "./getAdditivesInfo"

interface IProps {
    id: number,
    spotId: number
    amount: number
    groups: {
        id: number
        selectedAdditives: number[]
    }[] 
}

  


const CartItem : FC<IProps> =({id, spotId, amount,groups})=>{
    const [itemInfo, setItemInfo] = useState<DishItem| null>(null)
    const {itemModels, itemOperations} = getItemInfo()
useEffect(()=>{
    itemOperations.getItem(spotId, id)
    
},[])
useEffect(()=>{
    setItemInfo(itemModels.itemDetails);
    // (itemInfo && groups) ? console.log(getAdditivesInfo(itemInfo, groups)) : null
    
},[itemModels.itemDetails])


function calculateDishWithAdditivesCost(itemInfo : DishItem) {
    let totalCost = itemInfo.price; // Начальная стоимость - цена блюда
  
    // Проходим по всем группам добавок, указанным в информации о блюде
    itemInfo.groups.forEach(group => {
      const selectedGroup = groups.find(g => g.id === group.id); // Найдем выбранную группу в переменной groups
      if (selectedGroup && selectedGroup.selectedAdditives) {
        selectedGroup.selectedAdditives.forEach(additiveId => {
          const additive = group.additives.find(a => a.id === additiveId); // Найдем добавку по ID
          if (additive) {
            totalCost += additive.price; // Добавляем стоимость каждой выбранной добавки
          }
        });
      }
    });
  
    return totalCost;
  }


    return(
        <View key={id} style={{
            width: '100%',
            padding: scale(15),
        }}>
          <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}>
        <View style={{
            flexDirection: 'row',
            gap: scale(10),
        }}>
        {itemInfo?.image ? (
						<Image
						source={{ uri: itemInfo?.image }}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10) }}
						resizeMode='cover'
					/>
					):(
						<Image
						source={require('@/assets/images/main/empty_dish.png')}
						style={{ width: scale(40), height: scale(40), borderRadius: scale(10)}}
						resizeMode='cover'
					/>
					)}
                    <View style={{gap: scale(10)}}>
                        <Text style={{color:'white', fontWeight: 'bold', fontSize: scale(12), width: scale(140)}} >
                            {`${!itemInfo?.name ? '...' : itemInfo?.name}`}
                        </Text>
                        {(groups && itemInfo) ? (
                            getAdditivesInfo(itemInfo, groups)?.map((group, index) => (
                                <View key={itemInfo.id + "-" + group.groupName + "-" + index} style={{ marginBottom: scale(5) }}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: scale(12),
                                    fontWeight: 'bold'
                                }}>
                                    {group.groupName}
                                </Text>
                                {group.additives.map((additive, addIndex) => (
                                    <Text key={itemInfo.id + "-" + group.groupName + "-" + addIndex} style={{
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: scale(12)
                                    }}>
                                    {`   ${additive.name} - ${formatPrice(additive.price)}`}
                                    </Text>
                                ))}
                                </View>
                            ))
                            ) : null}

                        
                        {/* {groups && ((getAdditivesInfo(itemInfo, groups))?.map(group=>(
                            <Text key={id + group.groupName} style={{
                                color: 'white',
                                fontSize: scale(12)
                            }}>{group.groupName}</Text>
                            

                            
                        )))} */}

                        <Text style={{fontSize: scale(14), color: Colors.price, fontWeight: 'bold'}}>{formatPrice(itemInfo?.price ? calculateDishWithAdditivesCost(itemInfo): 0)}</Text> 
                    </View>
        </View>
                    <CartItemIncrementer dishId={id} placeId={spotId} groups={groups}/>
          </View>
        </View>
    )
}
export default CartItem