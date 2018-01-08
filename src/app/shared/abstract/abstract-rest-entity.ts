export abstract class AbstractRestEntity {

  public _id: string = null;

  constructor(obj?: Object) {
    if (obj) { this.hydrate(obj); }
  }

  public hydrate(obj: Object): void {
    Object.assign(this, obj);
  }

  public toSendRest(): any {
    const res: any = {};
    for (const obj in this) {
      if (typeof(this[obj]) !== 'function') {
        res[obj] = this[obj];
      }
    }
    return res;
  }

}
