const filterData = (field, data) => {
	let obj={};
	field.forEach((param) => {
		if (data[param] && !onlySpaces(data[param])) {
			obj[param] = data[param];
		} 
	})
	return obj;
}

const  hasWhiteSpace = (s) => {
  return /\s/g.test(s);
}

const onlySpaces = (s) => {
	return s.toString().trim().length === 0;
}

module.exports = filterData;