const { makeObservable, observable, computed } = require("mobx");

module.exports = class Store {
  constructor(_state) {
    this.state = _state;
    makeObservable(this, {
      isFoo: computed,
      state: observable,
    });
  }

  get isFoo() {
    return this.state.key === "foo";
  }
}
