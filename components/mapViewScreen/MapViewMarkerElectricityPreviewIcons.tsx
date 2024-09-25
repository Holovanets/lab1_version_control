import { Colors } from '@/constants'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
  electricity: {
    spotId: number,
    status: number | undefined,
    share: number | undefined,
  }| null
}

const MapViewMarkerElectricityPreviewIcons: FC<IProps> = ({electricity}) => {
  if(!electricity){
    return (
      <View style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
      }}>
         <View style={{
          borderRadius: scale(50),
          backgroundColor: '#151515',
          width: scale(40),
          height: scale(20),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <Ionicons name="bulb" size={16} color={Colors.mDark} />
          <Ionicons name="alert" size={16} color={Colors.mDark} />
        </View>
      </View>
    )
  }
  else{
    return (
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        bottom: 0,
        gap: scale(1),
        borderRadius: scale(50),
        overflow: 'hidden'
      }}>
        <View style={{
          borderRadius: scale(2),
          backgroundColor: '#151515',
          width: scale(22),
          height: scale(20),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {electricity.status === 0 && <Ionicons name="flash-off" size={16} color={Colors.mDark} />}
          {electricity.status === 1 && <Ionicons name="flash" size={16} color={Colors.success} />}
          {electricity.status === 2 && <Ionicons name="flashlight-outline" size={16} color={Colors.warning} />}
          {electricity.status === 3 && <Ionicons name="hand-left-outline" size={16} color={Colors.warning} />}
        </View>
        <View style={{
          borderRadius: scale(2),
          backgroundColor: '#151515',
          width: scale(22),
          height: scale(20),
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {electricity.share === 0 && <Ionicons name="ban-outline" size={16} color={Colors.mDark} />}
          {electricity.share === 1 && <Ionicons name="battery-charging-outline" size={16} color={Colors.success} />}
          {electricity.share === 2 && <Ionicons name="laptop-outline" size={16} color={Colors.warning} />}
          {electricity.share === 3 && <Ionicons name="leaf-outline" size={16} color={Colors.warning} />}
        </View>
      </View>
    )
  }
}

export default MapViewMarkerElectricityPreviewIcons