import { CheckBox } from '@/atoms';
import { Colors } from '@/constants';
import { formatPrice } from '@/services/formatPrice';
import { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { scale } from 'react-native-size-matters';

interface Additive {
  id: number;
  price: number;
  name: string;
  selectedAmount: number;
  selected: boolean;
}
interface IProps {
  additivesGroup: {
    spotId: number;
    id: number;
    name: string;
    max: number;
    min: number;
    additives: Additive[];
  };
  selectedAdditives: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

const DishAdditivesBlock: FC<IProps> = ({ additivesGroup, selectedAdditives, onSelectionChange }) => {
  const isRadio = additivesGroup.min === 1 && additivesGroup.max === 1;

  const handleAdditiveChange = (id: number) => {
    if (additivesGroup.max === 1 && additivesGroup.min === 1) {
      // Радиокнопка: только одна добавка может быть выбрана
      onSelectionChange([id]);
    } else {
      // Чекбокс: можно выбирать множество добавок
      const currentIndex = selectedAdditives.indexOf(id);
      if (currentIndex > -1) {
        // Удаляем выбранную добавку
        onSelectionChange(selectedAdditives.filter(item => item !== id));
      } else {
        // Добавляем новую добавку, только если не превышен лимит
        if (selectedAdditives.length < additivesGroup.max || additivesGroup.max === 0) {
          onSelectionChange([...selectedAdditives, id]);
        }
      }
    }
  };
  

  return (
    <View style={{ padding: scale(5) }}>
      <Text style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: scale(16),
        width: scale(290)
      }}>
        {`${additivesGroup.name} від ${additivesGroup.min} до ${additivesGroup.max}`}
      </Text>
      <View style={{
        gap: scale(5),
        marginTop: scale(10)
      }}>
       {additivesGroup.additives.map((additive) => (
        <View 
        key={additive.id}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <CheckBox
            
            checked={selectedAdditives.includes(additive.id)}
            title={additive.name}
            onChange={() => handleAdditiveChange(additive.id)}
            isRadio={isRadio}
            disabled={additivesGroup.max !== 1 && selectedAdditives.length >= additivesGroup.max && !selectedAdditives.includes(additive.id)}
          />
          {additive.price !== 0 && (
            <Text style={{
              color: Colors.price,
              fontSize: scale(12)
            }}>
              +{formatPrice(additive.price)}
            </Text>
          )}
        </View>
      ))}

      </View>
    </View>
  );
};

export default DishAdditivesBlock;
