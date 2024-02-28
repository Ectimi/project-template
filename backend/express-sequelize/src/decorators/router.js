exports.Get = (path) => {
  return function fn(target, name, descriptor) {
    const prefix = (target && target.prefix) || '';

    descriptor.value.path = prefix + path;
    descriptor.value.method = 'get';
    descriptor.value.type = 'route';

    return descriptor.value;
  };
};
