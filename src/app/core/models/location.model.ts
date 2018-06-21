type json = LocationApi | string | null;

/**
 * Class of **location** with mapper ot handle different states of location property.
 * To take only value of <code>name</code> property call <code>toString()</code>
 * **LocationApi.new( json )**
 * To prevent occurring errors on the backend invoke <code>.new(json)</code> static method.
 * _POSTing a blank object leads to an error_
 * Constructor function takes next types of input: <code>LocationApi object | string | null</code>
 * @property {number} [id] - ID of this location
 * @property {string} name - represented name of this location
 * @see toString
 * @see new
 */
export class LocationApi {
  id?: number;
  name: string;

  constructor(json: json) {
    // TODO: keeped checking on null, undefined & empty string;
    if (json != undefined) {
      if (typeof json === 'string') {
        this.name = json || undefined;
      } else {
        this.name = json.name || undefined;
        if (json.id) {
          this.id = json.id;
        }
      }
    } else {
      this.name = undefined;
    }
  }

  /**
   * To prevent errors on the backend, don't create an object from unacceptable values.
   * @param json
   * @return {undefined|LocationApi}
   */
  static new(json: json): undefined | LocationApi {
    return (!json) ? undefined : new LocationApi(json);
  }

  // TODO: remove this temporaty crutch
  static numberForAdvertCreation(value) {
    return (Number.isNaN(+value) || +value === 0) ? undefined : +value;
  }


  /**
   * Return string value of name property
   * @return {string}
   */
  toString(): string {
    return this.name || '';
  }
}
