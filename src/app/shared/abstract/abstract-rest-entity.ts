export abstract class AbstractRestEntity {

  public _id: string = null;

  constructor(obj?: Object) {
    if (obj) { this.hydrate(obj); }
  }

  public hydrate(obj: Object): void {
    Object.assign(this, obj);
  }

  public toSendRest(): this {
    return this;
  }

}
