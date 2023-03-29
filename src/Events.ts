import globals from "./globals";
import inventoryExtras from "./NodeGen/inventoryExtras";

type inventoryTypes = 'equipment' | 'crafting' | 'inventory'

export default () => {
  globals.Dispatcher.addEventListener('switchInventoryView', (type?: inventoryTypes) => {
    [...globals.inventoryDescElements.extra!.children].forEach(child => child.remove())
    switch (type) {
      case 'inventory':
      case 'equipment':
        globals.inventoryDescElements.extra!.appendChild(inventoryExtras.inventory)
        if(type === 'equipment') globals.inventoryDescElements.extra!.appendChild(inventoryExtras.equipment)
        break;

      case 'crafting':
        globals.inventoryDescElements.extra!.appendChild(inventoryExtras.crafting)
        break;
    }
  })
}