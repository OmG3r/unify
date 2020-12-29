import {nanoid} from './utils'
export const taxRate = 0.19
export const clicPayRate = 0.025
export const creations = {
    "EUJHU3": {
        type: "hoodie",
        name: 'Eco Unisex Hoodie',
        cost: 32,
        profit: 6,
        material: '80% Certified Organic Cotton, 20% Recycled Polyester',
        sizes: 'S - 4XLT',
        imgs: {
            front: '/imgs/clothes/hoodies/normal-front.png',
            back: '/imgs/clothes/hoodies/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"]
    },
    "X8E7FC": {
        type: "hoodie",
        name: 'Premium Pullover Hoodie',
        cost: 29,
        profit: 8,
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: 'S - 2XL',
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: [ "Red", "Green"]
    },
    "NV7ECZ": {
        type: "long-tee",
        name: 'Classic Long Sleeve Tee',
        cost: 14,
        profit: 5,
        material: 'Regular fit, 100% cotton, unisex',
        sizes: 'S - 2XL',
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: ["Black", "White", "Green"]
    },
    "REXE7C": {
        type: "long-tee",
        name: 'Premium Long Sleeve Tee',
        cost: 17,
        profit: 6,
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: 'S - XL',
        imgs: {
            front: '/imgs/clothes/long-tee/premium-front.png',
            back: '/imgs/clothes/long-tee/premium-back.png'
        },
        colors: ["Black", "Red", "Green", "White"]
    },
    "25X8E7": {
        type: "sweatshirt",
        name: 'Premium Long Sleeve Tee',
        cost: 17,
        profit: 7,
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: 'S - XL',
        imgs: {
            front: '/imgs/clothes/sweatshirts/normal-front.png',
            back: '/imgs/clothes/sweatshirts/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"]
    },
}