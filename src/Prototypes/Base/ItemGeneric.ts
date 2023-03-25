
export interface ItemGenericConstructor {
  id: string;
  name: string;
  icon?: string;
  isCountable: boolean;
  count?: number;
}

export class ItemGeneric {
  name: string;
  id: string;
  icon: string;
  isCountable: boolean;
  count?: number;
  constructor(obj: ItemGenericConstructor) {
    this.name = obj.name;
    this.id = obj.id;
    this.icon = obj.icon || "";
    this.isCountable = obj.isCountable;
    if(this.isCountable) this.count = obj.count || 0; 
  }

}
