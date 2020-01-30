const usingCache = new WeakMap();

function getOrCreateStateManager(obj, property, create) {
  let objCache = usingCache.get(obj);
  if (!objCache) {
    objCache = new Map();
    usingCache.set(obj, objCache);
  }
  let stateManager = objCache.get(property);
  if (!stateManager) {
    stateManager = create();
    objCache.set(property, stateManager);
  }
  return stateManager;
}

export function use(prototype, propertyName, desc) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      let stateManager = getOrCreateStateManager(this, propertyName, () => {
        return desc.initializer.call(this);
      });
      return stateManager.state;
    }
  }
}
