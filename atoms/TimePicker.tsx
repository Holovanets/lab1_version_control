
  import { Colors } from '@/constants';
import { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
  import { Animated, Text, View,FlatList} from 'react-native';
import { scale } from 'react-native-size-matters';


  interface PickerItem {
    key: string;
    label: string;
    [key: string]: any; 
  }

  interface CustomPickerProps {
    data: PickerItem[];
    onChange: (item: PickerItem) => void;
    selectedItem: PickerItem;
    labelExtractor: (item: PickerItem) => string;
  }
  
  const CustomPickerInner: ForwardRefRenderFunction<any, CustomPickerProps> = 
    ({ data, onChange, selectedItem, labelExtractor }, ref) => {
      const ITEM_HEIGHT = 42;
      const PICKER_HEIGHT = ITEM_HEIGHT * 3;
      const animatedValue = useRef(new Animated.Value(0)).current;
      const flatListRef = useRef<FlatList<PickerItem>>(null);
  
      useImperativeHandle(ref, () => ({
        scrollToOffset: (offset: number, animated: boolean) => {
          flatListRef.current?.scrollToOffset({ offset, animated });
        }
      }));
  
      useEffect(() => {
        const index = data.findIndex(item => item.key === selectedItem.key);
        const offset = ITEM_HEIGHT * index;
        flatListRef.current?.scrollToOffset({ offset, animated: false });
  
        animatedValue.addListener(({ value }) => {
          const index = Math.round(value / ITEM_HEIGHT);
          if (data[index]) {
            onChange(data[index]);
          }
        });
      
        
        return () => animatedValue.removeAllListeners();
      }, [data, selectedItem, onChange, animatedValue]);
  
      return (
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          scrollEnabled={true}
          onMomentumScrollEnd={(e) => {
            const offsetY = e.nativeEvent.contentOffset.y;
            const index = Math.round(offsetY / ITEM_HEIGHT);
            
            if (data[index]) {
              onChange(data[index]);
            }
            
          }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            keyExtractor={item => item.key}
            style={{ height: PICKER_HEIGHT, flexGrow: 0 }}
            contentContainerStyle={{
                paddingVertical: PICKER_HEIGHT / 2 - ITEM_HEIGHT / 2,
            }}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            renderItem={({ item }) => {
                return (
                    <View style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.Text style={{ color:'white', fontSize: scale (16), paddingHorizontal: scale(15) }}>
                            {labelExtractor(item)}
                        </Animated.Text>
                    </View>
                );
            }}
        />
    );
  };
  const CustomPicker = forwardRef(CustomPickerInner);


 interface IPicker {
  setSelectedDay: (selectedDay: any) => void
  setHours : (hours : any) => void
  setSelectedHour: (selectedHour: any) => void
  setSelectedMinute: (selectedMinute: any) => void
  selectedDay: any 
  hours: any
  selectedHour: any
  selectedMinute: any
  days: any
  minutes: any
 }
  export default function TimePicker({
    setSelectedDay,
    setHours,
    setSelectedHour,
    setSelectedMinute,
    selectedDay,
    hours,
    selectedHour,
    selectedMinute,
    days,
    minutes
  
  }:IPicker) {
 
    const handleDayChange = (item: PickerItem) => {
      setSelectedDay(item as unknown as typeof selectedDay);
    };
    const handleMinuteChange = (item: PickerItem) => {
      setSelectedMinute(item as unknown as typeof selectedMinute);
    };
    
  
    useEffect(() => {
        const newHours = [...Array(selectedDay.maxHour - selectedDay.minHour + 1).keys()].map(i => {
            const hour = selectedDay.minHour + i;
            return {
                key: `hour-${hour}`,
                label: `${hour < 10 ? '0' : ''}${hour}`,
            };
        });
        setHours(newHours);
        setSelectedHour(newHours[0]);
    }, [selectedDay]);

    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <View style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 42,
                height: 42,
                borderRadius: scale(10),
                backgroundColor: Colors.mDark15
              }}>

              </View>
              <View style={{
                paddingHorizontal: scale(15),
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                zIndex: 1000
              }}>
                <CustomPicker
                    data={days}
                    onChange={handleDayChange}
                    selectedItem={selectedDay}
                    labelExtractor={item => item.label}
                />
                <CustomPicker
                    data={hours}
                    onChange={setSelectedHour}
                    selectedItem={selectedHour}
                    labelExtractor={item => item.label}
                />
                <CustomPicker
                    data={minutes}
                    onChange={handleMinuteChange}
                    selectedItem={selectedMinute}
                    labelExtractor={item => item.label}
                />
              </View>
            
            </View>
        </View>
    );
  }
