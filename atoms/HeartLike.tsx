import { Colors } from '@/constants';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import { FC, memo } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

interface IProps{
  isActive: boolean;
  likes: number
}
const HeartLike: FC<IProps> = memo(({isActive,likes}) =>{

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            // borderRadius: 20,
          }}>
          <MotiView
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: Colors.darky,
              // backgroundColor: ,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexDirection: 'row',
              gap: 10
            }}>
              <Text style={{ color: 'white', fontSize: 14, zIndex: 10 }}>{likes}</Text>
            <View>
            <MotiView
              from={{
                scale: 1,
              }}
              animate={{
                scale: isActive ? 7 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 72,
                damping: 12,
              }}>
              <Entypo name='heart' size={24} color={Colors.mDark15} />
            </MotiView>
            <MotiView
              from={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 72,
                damping: 12,
                // delay: isActive ? 400 : 0,
              }}
              style={{ position: 'absolute' }}>
              <Entypo name='heart' size={24} color={Colors.mDark} />
            </MotiView>
            <MotiView
              from={{
                scale: 0.2,
                opacity: 0,
                borderWidth: 4,
              }}
              animate={{
                scale: isActive ? [0, 1.6, 1.7] : 0.2,
                opacity: isActive ? [1, 1, 0] : 0,
                borderWidth: isActive ? [2, 2, 0] : 0,
              }}
              transition={{
                type: 'timing',
                duration: 250,
              }}
              style={{
                position: 'absolute',
                borderColor: Colors.mDark,
                width: '100%',
                height: '100%',
                borderRadius: 200,
              }}
            />
            </View>
          </MotiView>
        </View>
    </View>
  );
})
export default HeartLike