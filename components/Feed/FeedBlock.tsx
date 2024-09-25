import { FC, ReactNode, useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import FeedItem from './FeedItem'
import { SpotItem } from '@/services/useFeed'

interface IProps{
	item: SpotItem
}

const FeedBlock: FC<IProps> = ({item}) => {
		return (
			<View style={{
				paddingHorizontal: scale(15),
			}}>
				<FeedItem item={item}/>
			</View>
		)
}

export default FeedBlock