const productsData = [
	{
		id: 1,
		name: "Nombre1",
		category: "exterior",
		price: 1000,
		cardImg: "../assets/img/pexels-alex-staudinger-4596578.jpg",
	},
	{
		id: 2,
		name: "Nombre2",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-alleksana-4113894.jpg",
	},
	{
		id: 3,
		name: "Nombre3",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-amelia-cui-11985895.jpg",
	},
	{
		id: 4,
		name: "Nombre4",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-anna-nekrashevich-8989427.jpg",
	},
	{
		id: 5,
		name: "Nombre5",
		category: "otras",
		price: 1000,
		cardImg: "../assets/img/pexels-dominika-roseclay-912413.jpg",
	},
	{
		id: 6,
		name: "Nombre6",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-eva-bronzini-5758605.jpg",
	},
	{
		id: 7,
		name: "Nombre7",
		category: "interior",
		price: 1000,
		cardImg: "../assets/img/pexels-famingjia-inventor-11534883.jpg",
	},
	{
		id: 8,
		name: "Nombre8",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-felipe-alves-9297353.jpg",
	},
	{
		id: 9,
		name: "Nombre9",
		category: "exterior",
		price: 1000,
		cardImg: "../assets/img/pexels-ithalu-dominguez-942649.jpg",
	},
	{
		id: 10,
		name: "Nombre10",
		category: "exterior",
		price: 1000,
		cardImg: "../assets/img/pexels-justyna-grochowska-9819646.jpg",
	},
	{
		id: 11,
		name: "Nombre11",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-karolina-grabowska-5202090.jpg",
	},
	{
		id: 12,
		name: "Nombre12",
		category: "huerta",
		price: 1000,
		cardImg: "../assets/img/pexels-karolina-grabowska-5202102.jpg",
	},
	{
		id: 13,
		name: "Nombre13",
		category: "interior",
		price: 1000,
		cardImg: "../assets/img/pexels-karolina-grabowska-7185740.jpg",
	},
	{
		id: 14,
		name: "Nombre14",
		category: "interior",
		price: 1000,
		cardImg: "../assets/img/pexels-karolina-grabowska-7193658.jpg",
	},
	{
		id: 15,
		name: "Nombre15",
		category: "otras",
		price: 1000,
		cardImg: "../assets/img/pexels-kulbir-10758032.jpg",
	},
	{
		id: 16,
		name: "Nombre16",
		category: "otras",
		price: 1000,
		cardImg: "../assets/img/pexels-liz-romo-1999579.jpg",
	},
];

// VER  MAS
const splitProducts = (size) => {
	let dividedProducts = [];
	for (let i = 0; i < productsData.length; i += size) {
		dividedProducts.push(productsData.slice(i, i + size));
	}
	return dividedProducts;
};

const productsController = {
	dividedProducts: splitProducts(3),
	nextProductsIndex: 1,
	productsLimit: splitProducts(3).length,
};
