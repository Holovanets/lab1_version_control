export default [
	{
		id: 0,
		name: 'Улюблене',
		isDelivery: true,
		isPromo: true,
		img: 'https://media.discordapp.net/attachments/534404806182436897/1181195475496480788/png-transparent-shawarma-art-drawing-love-shawarma-love-miscellaneous-food.png?ex=65802d02&is=656db802&hm=21ffb78bc2631eba430b3f8f5c67f2234f6d6d6624fc64c16ef9b2690f002296&=&format=webp&quality=lossless',
		dishes: [
			{
				id: 0,
				name: 'VIVA LA ШАУРМА: З КУРКОЮ ',
				isDelivery: true,
				price: 15000,
				sale: 14010,
				weight: 540,
				description:
					'Кукурудзяний лаваш, мясо курки, часниковий соус, картопля смажена, капуста пекінська, кріп, петрушка, помідор свіжий, огірок свіжий.',
				likes: 242,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181199026973057035/640_480_2389_26279_1677241974.jpeg?ex=65803051&is=656dbb51&hm=b19f75cae501c05a9a7311ccaceb31422c372af20b8c0be48aa29b78add77b1b&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',

						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 1,
				name: 'VIVA LA ШАУРМА: Зі Свининою',
				isDelivery: true,
				price: 19000,
				sale: 19000,
				weight: 500,
				description:
					'Кукурудзяний лаваш, мясо свинини, часниковий соус, картопля смажена, капуста пекінська, кріп, петрушка, помідор свіжий, огірок свіжий.',
				likes: 232,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181207978360197280/640_480_2389_76314_1677242823.jpeg?ex=658038a7&is=656dc3a7&hm=1adfc014cf3650144db26be525be4581e32e965119f3870858f1f04f9f69861b&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			}
		]
	},
	{
		id: 1,
		name: 'Шаурма',
		isDelivery: true,
		isPromo: false,
		img: 'https://media.discordapp.net/attachments/534404806182436897/1181207978360197280/640_480_2389_76314_1677242823.jpeg?ex=658038a7&is=656dc3a7&hm=1adfc014cf3650144db26be525be4581e32e965119f3870858f1f04f9f69861b&=&format=webp',
		dishes: [
			{
				id: 0,
				name: 'VIVA LA ШАУРМА: З КУРКОЮ',
				isDelivery: true,
				price: 150,
				sale: 140,
				weight: 540,
				description:
					'Кукурудзяний лаваш, мясо курки, часниковий соус, картопля смажена, капуста пекінська, кріп, петрушка, помідор свіжий, огірок свіжий.',
				likes: 242,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181199026973057035/640_480_2389_26279_1677241974.jpeg?ex=65803051&is=656dbb51&hm=b19f75cae501c05a9a7311ccaceb31422c372af20b8c0be48aa29b78add77b1b&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',

						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 1,
				name: 'VIVA LA ШАУРМА: Зі Свининою',
				price: 19000,
				isDelivery: true,
				sale: 12000,
				weight: 500,
				description:
					'Кукурудзяний лаваш, мясо свинини, часниковий соус, картопля смажена, капуста пекінська, кріп, петрушка, помідор свіжий, огірок свіжий.',
				likes: 232,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181207978360197280/640_480_2389_76314_1677242823.jpeg?ex=658038a7&is=656dc3a7&hm=1adfc014cf3650144db26be525be4581e32e965119f3870858f1f04f9f69861b&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 2,
				name: 'VIVA LA ШАУРМА: З Телятиною',
				price: 19500,
				isDelivery: true,
				sale: 19500,
				weight: 500,
				description:
					'Кукурудзяний лаваш, мясо телятини, часниковий соус, картопля смажена, капуста пекінська, кріп, петрушка, помідор свіжий, огірок свіжий.',
				likes: 53,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181936811409420288/640_480_2389_94581_1677243405.jpeg?ex=6582df6f&is=65706a6f&hm=0f0590149c1f12dbf5ab92299b0a628c5d19d8ee7a527f4a24d1976ea39f4217&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 3,
				name: 'ШАУРМА EL PABLO: Зі Свининою',
				price: 19500,
				isDelivery: true,
				sale: 19500,
				weight: 450,
				description:
					'Чорний лаваш, мясо свинини, часниковий соус, фірмовий соус, кріп, петрушка, помідор свіжий, огірок свіжий, цибуля, кінза, болгарський перець, аджика.',
				likes: 423,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181937317963890758/640_480_2389_51002_1677243976.jpeg?ex=6582dfe7&is=65706ae7&hm=b11fd484d0398b200124ee5f017b9adb3c0f5b117b2ad326230a3b32e0831590&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 4,
				name: 'BRAVO: СИР',
				price: 18500,
				isDelivery: true,
				sale: 18500,
				weight: 450,
				description:
					'Кукурудзяний лаваш, мясо курки, часниковий соус, картопля смажена, сир голландський, сир сулугуні.',
				likes: 423,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181937645715198046/640_480_2389_95813_1680447773.webp?ex=6582e036&is=65706b36&hm=23725946891411b4a4a0780b0bc457f5cc202cdbc7717987dc8bccc09b731b9f&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			},
			{
				id: 5,
				name: 'EL: ЛАПАТАСЬЙОН',
				price: 28000,
				isDelivery: true,
				sale: 27000,
				weight: 1250,
				description:
					'Кукурудзяний лаваш, мясо курки, часниковий соус, картопля смажена, капуста пекінське, кріп, петрушка, помідор свіжий, огірок свіжий',
				likes: 253,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181937993968271370/640_480_2389_77104_1692028974.webp?ex=6582e089&is=65706b89&hm=ae7276f12db79622ef7ae79b7ecbff4ad91df0ccf34ff2dded643988f2be6b1c&=&format=webp',
				additionals: [
					{
						id: 0,
						isRequired: true,
						name: 'Добавки',
						radio: false,
						maxCount: 3,
						additionals: [
							{ id: 0, name: 'Порізати навпіл', price: 0 },
							{ id: 1, name: 'Сир', price: 25 },
							{ id: 2, name: 'Гриби', price: 25 },
							{ id: 3, name: 'Подвійне мясо', price: 70 },
							{ id: 4, name: 'Гострий соус', price: 0 },
							{ id: 5, name: 'Кукурудза', price: 25 },
							{ id: 6, name: 'Ананас', price: 25 },
							{ id: 7, name: 'Сир сулугуні', price: 25 }
						]
					},
					{
						id: 1,
						isRequired: false,
						name: 'Видалити',
						radio: false,
						maxCount: 5,
						additionals: [
							{ id: 0, name: 'Без картоплі', price: 0 },
							{ id: 1, name: 'Без помідор', price: 0 },
							{ id: 2, name: 'Без зелені', price: 0 },
							{ id: 3, name: 'Подвійне мясо', price: 0 },
							{ id: 4, name: 'Без капусти', price: 0 },
							{ id: 5, name: 'Без огірка', price: 0 },
							{ id: 6, name: 'Без часникового соусу', price: 0 }
						]
					}
				]
			}
		]
	},
	{
		id: 2,
		name: 'Холодні напої',
		isDelivery: true,
		isPromo: false,
		img: 'https://media.discordapp.net/attachments/534404806182436897/1181570519049453598/640_480_2389_39843_1678111497.jpeg?ex=65818a4c&is=656f154c&hm=6ccdfb70747d01f0e733cec683a87163d131e3e894642d0d542da556d9346026&=&format=webp',
		dishes: [
			{
				id: 0,
				name: 'Фанта',
				isDelivery: true,
				price: 3500,
				sale: 3500,
				weight: 1,
				description: '',
				likes: 12,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181938678239612938/640_480_2389_72749_1678206361.webp?ex=6582e12c&is=65706c2c&hm=5f6953daebaa534d92ebc19774d4cf2e9f96b78638eb63b44bff8d7b3f3f8cd1&=&format=webp',
				additionals: []
			},
			{
				id: 1,
				name: 'Спрайт',
				isDelivery: true,
				price: 3500,
				sale: 3500,
				weight: 1,
				description: '',
				likes: 9,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181938974831427604/640_480_2389_27052_1678206492.webp?ex=6582e172&is=65706c72&hm=b2dbed80eb3bdaba9170d2f3dc0396d2be2b1c28159b936a56e14891357034d5&=&format=webp',
				additionals: []
			},
			{
				id: 2,
				name: 'Coca-Cola',
				isDelivery: true,
				price: 3500,
				sale: 3500,
				weight: 1,
				description: '',
				likes: 26,
				isLike: false,
				img: 'https://media.discordapp.net/attachments/534404806182436897/1181570519049453598/640_480_2389_39843_1678111497.jpeg?ex=65818a4c&is=656f154c&hm=6ccdfb70747d01f0e733cec683a87163d131e3e894642d0d542da556d9346026&=&format=webp',
				additionals: []
			}
		]
	}
]
