
const getMissingPoisonProperty = async (err) => {

  let missingProperty;
  const poisonProperties = [
    "barcode",
    "generic_name",
    "type",
    "qty",
    "residualQty",
    "rate",
    "brand",
    "active_ingredient",
    "country_of_manufacture",
    "expiryDate",
    "entryDate",
    "minReorderQty",
  ];

  for (let i = 0; i < poisonProperties.length; i++) {
    try {
      missingProperty = await err.errors[`${poisonProperties[i]}`].path;
      return missingProperty;  
    } catch (err) {
        missingField = "none";
    }
  }

  return missingField;
};




module.exports = {
    getMissingPoisonProperty,
};