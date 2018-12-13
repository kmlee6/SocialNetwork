replaceAll = function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

onlyUnique = function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

removeNull = function removeNull(el){
  return el != null;
}

module.exports = {replaceAll, onlyUnique, removeNull}