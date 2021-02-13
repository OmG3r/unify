import { nanoid } from './utils'
export const taxRate = 0.19
export const clicPayRate = 0.025
let varprint = {
    front: {
        top: 50,
        width: 310,
        height: 310
    },
    back: {
        top: 300,
        width: 210,
        height: 300
    }
}
export const creations = {
    "EUJHU3": {
        type: "hoodie",
        name: 'Eco Unisex Hoodie',
        cost: 32,
        profit: 6,
        delivery: 7,
        material: '80% Certified Organic Cotton, 20% Recycled Polyester',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/normal-front.png',
            back: '/imgs/clothes/hoodies/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: varprint
    },
    "X8E7FC": {
        type: "hoodie",
        name: 'Premium Pullover Hoodie',
        cost: 29,
        profit: 8,
        delivery: 7,
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: ["Red", "Green"],
        printable: varprint
    },
    "NV7ECZ": {
        type: "long-tee",
        name: 'Classic Long Sleeve Tee',
        cost: 14,
        profit: 5,
        delivery: 7,
        material: 'Regular fit, 100% cotton, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: ["Black", "White", "Green"],
        printable: varprint
    },
    "REXE7C": {
        type: "long-tee",
        name: 'Premium Long Sleeve Tee',
        cost: 17,
        profit: 6,
        delivery: 7,
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/long-tee/premium-front.png',
            back: '/imgs/clothes/long-tee/premium-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: varprint
    },
    "25X8E7": {
        type: "sweatshirt",
        name: 'Premium Long Sleeve Tee',
        cost: 17,
        profit: 7,
        delivery: 7,
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/sweatshirts/normal-front.png',
            back: '/imgs/clothes/sweatshirts/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: varprint
    },
}