import { CustomButton } from '@/atoms'
import { Colors } from '@/constants'
import { FC } from 'react'
import { View, Animated, Share, Alert } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IProps {
	HEADER_HEIGHT: number
	scrollY: Animated.Value
	goBack: () => void
	title: string
	openWiFi : ()=> void
	spotId: number
}

const PlaceHeaderBar: FC<IProps> = ({
	HEADER_HEIGHT,
	scrollY,
	goBack,
	title,
	openWiFi, 
	spotId
}) => {
	
	const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `https://cityfood.com.ua/(app)/place/${spotId}`,
				title: `${title} в CityFood!`,
				url: `https://cityfood.com.ua/(app)/place/${spotId}`
				
      },{
				tintColor: Colors.mDark
			});
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				justifyContent: 'space-between',
				alignItems: 'center',
				paddingHorizontal: scale(15),
				paddingTop: Constants.statusBarHeight,
				flexDirection: 'row',
				zIndex: 1
			}}
		>
			<Animated.View
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					height: scale(70) + insets.top,
					backgroundColor: Colors.darky,
					opacity: scrollY.interpolate({
						inputRange: [scale(HEADER_HEIGHT - 220), scale(HEADER_HEIGHT - 120)],
						outputRange: [0, 1]
					})
				}}
			/>

			<View
				style={{
					marginTop: scale(10),
					justifyContent: 'space-between',
					flexDirection: 'row',
					width: '100%',
					alignItems: 'center'
				}}
			>
				<CustomButton callback={() => goBack()}>
					<Octicons name='chevron-left' size={scale(32)} color={Colors.accentRed} />
				</CustomButton>
				<Animated.Text
					numberOfLines={1}
					style={{
						color: 'white',
						fontSize: scale(16),
						fontWeight: 'bold',
						opacity: scrollY.interpolate({
							inputRange: [scale(HEADER_HEIGHT - 250), scale(HEADER_HEIGHT - 120)],
							outputRange: [0, 1]
						})
					}}
				>
					{title.length > 12 ? title.substring(0, 12) + '...' : title}
				</Animated.Text>
				<View style={{ flexDirection: 'row', gap: scale(10) }}>
					<CustomButton callback={() => openWiFi()}>
						<Ionicons name='wifi-outline' size={scale(24)} color={Colors.accentRed} />
					</CustomButton>
					<CustomButton callback={onShare}>
						<Ionicons name='arrow-redo-outline' size={scale(24)} color={Colors.accentRed} />
					</CustomButton>
					{/* <CustomButton callback={() => goBack()}>
						<Octicons name='search' size={scale(24)} color={Colors.accentRed} />
					</CustomButton> */}
				</View>
			</View>
		</View>
	)
}

export default PlaceHeaderBar
