const prepareCharacteristics = (valuesNames) => {
  const characteristics = [];
  valuesNames.forEach(valueName => {
    const filterName = valueName.characteristics.replace(', ', '');
    characteristics.push({
      name: filterName,
      value: valueName.value,
    })
  });
  return characteristics
}