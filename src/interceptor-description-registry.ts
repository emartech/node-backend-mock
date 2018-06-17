import { InterceptorDescription } from './interceptor-description';
import { not, add, set } from './utils';

interface RegistryItem {
  description: InterceptorDescription;
  registered: boolean;
  index: number;
}

export class InterceptorDescriptionRegistry {

  private _registry: RegistryItem[] = [];

  public getUnregistereds(): RegistryItem[] {
    return this._registry.filter(({ registered }) => not(registered));
  }

  public addDescription(description: InterceptorDescription): void {
    const registryItem = this.createRegistryItemFrom(description);
    this._registry = add(this._registry)(registryItem);
  }

  public registerDescription(index: number): void {
    const registryItem = this.createRegistryItemAsRegistered(index);
    this._registry = set(this._registry)(index)(registryItem);
  }

  public clear(): void {
    this._registry = [];
  }

  private createRegistryItemFrom(description: InterceptorDescription): RegistryItem {
    return { description, registered: false, index: this._registry.length };
  }

  private createRegistryItemAsRegistered(index: number): RegistryItem {
    return { description: this._registry[index].description, registered: true, index };
  }

}
