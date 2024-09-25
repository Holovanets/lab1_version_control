import { DishItem } from "@/services"
interface Additive {
  id: number;
  name: string;
  price: number;
}

interface AdditivesGroup {
  id: number;
  name: string;
  additives: Additive[];
  max: number;
  min: number;
  multipleSelection: boolean;
  uiPosition: number;
}

export interface Dish {
  calories: {
    calories: number;
    carbohydrates: number;
    fats: number;
    proteins: number;
    id: number;
  };
  categoryId: number;
  delivery: any[];
  description: string | null;
  groups: AdditivesGroup[];
  id: number;
  image: string;
  liked: number;
  name: string;
  position: number;
  price: number;
  priceAtDiscount: number;
  spotId: number;
  tags: any[];
  visible: boolean;
  weight: number;
}

interface SelectedAdditives {
  id: number;
  selectedAdditives: number[];
}

export function getAdditivesInfo(dish: any, additivesSelection: any): AdditivesInfo[] | null {
  // Создаём карту для быстрого доступа к выбранным добавкам по ID группы
  const selectionMap = new Map<number, number[]>();
  additivesSelection.forEach((group : any) => {
    selectionMap.set(group.id, group.selectedAdditives);
  });

  // Проходим по каждой группе добавок в блюде
  const result = dish.groups.map((group : any) => {
    const selectedAdditivesIds = selectionMap.get(group.id);
    if (!selectedAdditivesIds) {
      return null; // Если для группы нет выбранных добавок, пропускаем её
    }

    // Фильтруем и получаем только выбранные добавки
    const selectedAdditives = group.additives.filter((additive : any)=> 
      selectedAdditivesIds.includes(additive.id)
    ).map((additive : any)=> ({
      name: additive.name,
      price: additive.price
    }));

    return {
      groupName: group.name,
      additives: selectedAdditives
    };
  });

  // Фильтруем null значения, если нет выбранных добавок в группе
  return result.filter((groupInfo : any) => groupInfo !== null) as AdditivesInfo[];
}

interface AdditivesInfo {
  groupName: string;
  additives: {
    name: string;
    price: number;
  }[];
}
