// Token generator that represent an ordere list of string keys.
// The tokens are stored in a WeakMap to let them be garbage collected
// once the user stop using them.
export class SortController {
  constructor(muuri) {
    this._muuri = muuri;
    this._tokensMap = new WeakMap();
  }

  // Generate a token.
  getToken() {
    const token = new Token();
    const keys = this._muuri.getItems().map(item => item._component.key);

    this._tokensMap.set(token, keys);

    return token;
  }

  // Return if it is a token.
  isToken(token) {
    return this._tokensMap.has(token);
  }

  // Return the list linked to the token.
  getKeysList(token) {
    return this._tokensMap.get(token);
  }
}

// A simple token representation.
export class Token extends String {
  toString() {
    return "[Sort token]";
  }
}
