import { Colors } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { FC, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'

interface IProps {
  onChange: () => void;
  title: string;
  checked: boolean;
  disabled?: boolean;  // Добавляем необязательное свойство disabled
  isRadio?: boolean;   // Добавляем необязательное свойство isRadio для определения стиля кнопки
}

const CheckBox: FC<IProps> = ({ onChange, title, checked, disabled = false, isRadio = false }) => {
  return (
    <Pressable
      onPress={onChange}
      disabled={disabled}
      style={{
        flexDirection: 'row',
        gap: scale(10),
        opacity: disabled ? 0.5 : 1  // Уменьшаем прозрачность если disabled
      }}
    >
      <View
        style={[{
          width: scale(24),
          height: scale(24),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: isRadio ? scale(12) : scale(8),  // Если isRadio, делаем круглым
          borderWidth: scale(2),
          borderColor: Colors.mDark,
          backgroundColor: 'transparent',
        }, checked && {
          backgroundColor: Colors.mDark,
        }]}
      >
        {checked && <Ionicons name={isRadio ? "ellipse" : "checkmark"} size={16} color="white" />}
      </View>
      <Text style={{
        color: 'white',
        fontSize: scale(12)
      }}>
        {title}
      </Text>
    </Pressable>
  );
}

export default CheckBox;