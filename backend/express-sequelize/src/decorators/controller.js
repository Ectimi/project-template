exports.Controller = ({ prefix = '' }) => {
  return function (target) {
    target.prefix = prefix;
  };
};
