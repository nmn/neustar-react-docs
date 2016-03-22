module.exports.pluck = pluck;
function pluck(keyName) {
  var keys = typeof keyName === 'string' ? keyName.split('.') : keyName;
  return function(obj) {
    var retVal = obj[keys[0]];
    if (keys.length === 1) {
      return retVal;
    }
    return pluck(keys.slice(1))(retVal);
  };
}

module.exports.filterStrings = filterStrings;
function filterStrings(val) {
  return typeof val === 'string';
}

module.exports.toPostObj = toPostObj;
function toPostObj(environment) {
  return function(query) {
    return {
      method: 'POST',
      url: environment.getUserProvisioningHost(),
      data: query
    };
  };
}

module.exports.isValidName = name => Boolean(name && !name.match(/[<>\[\]]/));
