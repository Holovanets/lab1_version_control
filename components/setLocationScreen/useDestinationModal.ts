import { useLocationTextSearchQuery } from '@/services'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
export const useDestinationalModal = () => {
	const [destinationalInputValue, setDestinationalInputValue] = useState('')
	
	const [debouncedDestinitionValue] = useDebounce(destinationalInputValue, 600)
	
	const {responseData} = useLocationTextSearchQuery(debouncedDestinitionValue)
	// console.log(responseData);
	
	const onChangeText = (value: string) => {
		// console.log(value)
		setDestinationalInputValue(value)
	}
	return {
		models: { destinationalInputValue, textSearchQueryResponseData: responseData?.results || [] },
		operations: { onChangeText }
	}
}
