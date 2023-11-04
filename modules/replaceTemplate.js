module.exports = (template, elem) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, elem.productName);
  output = output.replace(/{%IMAGE%}/g, elem.image);
  output = output.replace(/{%QUANTITY%}/g, elem.quantity);
  output = output.replace(/{%COUNTRY%}/g, elem.from);
  output = output.replace(/{%DESCRIPTION%}/g, elem.description);
  output = output.replace(/{%PRICE%}/g, elem.price);
  output = output.replace(/{%NUTRIENTS%}/g, elem.nutrients);
  output = output.replace(/{%ID%}/g, elem.id);

  if (!elem.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
