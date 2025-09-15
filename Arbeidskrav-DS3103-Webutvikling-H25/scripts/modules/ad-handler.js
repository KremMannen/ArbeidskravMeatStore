const adHandler = (() => {
  let ads = [
    {
      id: 1,
      imgName: "ad-pepsi.jpg",
      title: "Special Offer!",
      link: "#",
      description: "Get 20% off all Chipotlepølser this week!",
    },
    {
      id: 2,
      imgName: "ad-food.jpg",
      title: "Limited Time Deal!",
      link: "#",
      description: "Buy one, get one free on all Karbonader!",
    },
  ];

  const getAll = () => {
    return structuredClone(ads);
  };

  return {
    getAll,
  };
})();

export default adHandler;
