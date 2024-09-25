import { FC } from 'react'
import { Text, View } from 'react-native'
type ISeparator = {
	height?: number | undefined
	width?: number | undefined
}

const Separator: FC<ISeparator> = ({ height, width }) => {
	return <View style={{ height, width }} />
}
Separator.defaultProps = {
	height: 0,
	width: 0
}
export default Separator
