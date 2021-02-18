import { nanoid } from './utils'
export const taxRate = 0.19
export const clicPayRate = 0.025
export const meterSquarePrice = 120
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
        print: {
            front: 5,
            back: 6
        },
        profit: 7,
        delivery: 7,
        material: '80% Certified Organic Cotton, 20% Recycled Polyester',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/normal-front.png',
            back: '/imgs/clothes/hoodies/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: {
            front: {
                top: 150,
                width: 280,
                height: 190
            },
            back: {
                top: 140,
                width: 270,
                height: 360
            }
        }
    },
    "X8E7FC": {
        type: "hoodie",
        name: 'Premium Unisex Hoodie',
        cost: 36,
        profit: 7,
        print: {
            front: 5,
            back: 6
        },
        delivery: 7,
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: ["Red", "Green"],
        printable: {
            front: {
                top: 140,
                width: 280,
                height: 220
            },
            back: {
                top: 170,
                width: 230,
                height: 350
            }
        }
    },
    "EF7CEX": {
        type: "hoodie",
        name: 'Zip Hoodie',
        cost: 32,
        profit: 7,
        delivery: 7,
        print: {
            front: 5,
            back: 6
        },
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/ziphoodie-front.png',
            back: '/imgs/clothes/hoodies/ziphoodie-back.png'
        },
        colors: ["Red", "Green"],
        printable: {
            front: {
                top: 160,
                width: 280,
                height: 210
            },
            back: {
                top: 140,
                width: 265,
                height: 360
            }
        }
    },
    "25X8E7": {
        type: "sweatshirt",
        name: 'Premium Unisex Sweatshirt',
        cost: 17,
        profit: 7,
        delivery: 7,
        print: {
            front: 5,
            back: 6
        },
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/sweatshirts/normal-front.png',
            back: '/imgs/clothes/sweatshirts/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: {
            front: {
                top: 130,
                width: 255,
                height: 330
            },
            back: {
                top: 120,
                width: 220,
                height: 360
            }
        }
    },
    "NV7ECZ": {
        type: "long-tee",
        name: 'Classic Long Sleeve Tee',
        disabled: true,
        cost: 14,
        profit: 7,
        delivery: 7,
        print: {
            front: 5,
            back: 6
        },
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
        disabled: true,
        cost: 17,
        profit: 7,
        delivery: 7,
        print: {
            front: 5,
            back: 6
        },
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/long-tee/premium-front.png',
            back: '/imgs/clothes/long-tee/premium-back.png'
        },
        colors: ["Black", "Red", "Green", "White"],
        printable: varprint
    },
}

export const phasedOut = {

}