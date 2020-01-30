const usingCache = new WeakMap();

function getOrCreateObjectCache(obj) {
  let objCache = usingCache.get(obj);
  if (!objCache) {
    objCache = new Map();
    usingCache.set(obj, objCache);
  }
  return objCache;
}

function getResource(obj, property) {
  return getOrCreateObjectCache(obj).get(property);
}

function setResource(obj, property, resource) {
  getOrCreateObjectCache(obj).set(property, resource);
}

export function use(prototype, propertyName, desc) {
  return {
    configurable: true,
    enumerable: true,
    get() {
      let [Klass, ...args] = desc.initializer.call(this);
      let resource = getResource(this, propertyName);
      if (resource && resource.args.every((arg, index) => arg === args[index])) {
        return resource.manager.state;
      } else {
        let manager = new Klass(...args);
        setResource(this, propertyName, { args, manager });
        return manager.state;
      }
    }
  }
}
