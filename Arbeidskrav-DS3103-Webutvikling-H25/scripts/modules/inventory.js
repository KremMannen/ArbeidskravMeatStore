const inventory = (() => {
  const products = [
    {
      id: 1,
      imgName: "chipotle-pølse.jpg",
      name: "Chipotlepølse",
      info: "m/Cheddar",
      producer: "Toten Kjøtt",
      weightInGrams: 230,
      priceNOK: 56,
      quantity: 27,
    },
    {
      id: 2,
      imgName: "fårikålkjøtt.jpg",
      name: "Fårikålkjøtt",
      info: "Av lam",
      producer: "Jæren Smak",
      weightInGrams: 1000,
      priceNOK: 234,
      quantity: 33,
    },
    {
      id: 3,
      imgName: "grillpølser.jpg",
      name: "Grillpølse",
      info: "Tradisjonelle grillpølser",
      producer: "Toten Kjøtt",
      weightInGrams: 500,
      priceNOK: 62,
      quantity: 15,
    },
    {
      id: 4,
      imgName: "karbonadedeig.jpg",
      name: "Karbonadedeig",
      info: "5% u/Salt og Vann",
      producer: "Meny",
      weightInGrams: 400,
      priceNOK: 56,
      quantity: 38,
    },
    {
      id: 5,
      imgName: "karbonader.jpg",
      name: "Karbonader",
      info: "Ferdigstekte",
      producer: "Toten Kjøtt",
      weightInGrams: 370,
      priceNOK: 73,
      quantity: 22,
    },
    {
      id: 6,
      imgName: "kyllingkjøttdeig.jpg",
      name: "Kyllingkjøttdeig",
      info: "u/Salt og Vann",
      producer: "First Price",
      weightInGrams: 600,
      priceNOK: 64,
      quantity: 31,
    },
    {
      id: 7,
      imgName: "røkte-kjøttpølser.jpg",
      name: "Kjøttpølse Røkt",
      info: "",
      producer: "Toten Kjøtt",
      weightInGrams: 450,
      priceNOK: 57,
      quantity: 18,
    },
    {
      id: 8,
      imgName: "wienerpølser.jpg",
      name: "Wienerpølse",
      info: "",
      producer: "Toten Kjøtt",
      weightInGrams: 470,
      priceNOK: 69,
      quantity: 40,
    },
  ];

  const getAll = () => {
    return structuredClone(products);
  };

  return {
    getAll,
  };
})();

export default inventory;
