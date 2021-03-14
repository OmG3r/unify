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
        quality: "standard",
        name: 'Eco Unisex Hoodie',
        metadata: {
            type: "hoodie",
            quality: "basic",
            category: "sweater"
        },
        cost: 22,
        print: {
            front: 9,
            back: 9
        },
        profit: 5,
        delivery: 8,
        material: 'S-XL, 100% cotton, comfort',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/normal-front.png',
            back: '/imgs/clothes/hoodies/normal-back.png'
        },
        colors: ["Black", "Red", "Green", "White", "Blue"],
        printable: {
            front: {
                top: 160,
                width: 260,
                height: 170
            },
            back: {
                top: 140,
                width: 250,
                height: 320
            }
        }
    },
    "EF7CEX": {
        type: "hoodie",
        name: 'Zip Hoodie',
        metadata: {
            type: "hoodie",
            quality: "basic",
            category: "zip"
        },
        cost: 25,
        profit: 5,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/ziphoodie-front.png',
            back: '/imgs/clothes/hoodies/ziphoodie-back.png'
        },
        colors: ["Red", "Black"],
        printable: {
            front: {
                top: 160,
                width: 260,
                height: 210
            },
            back: {
                top: 160,
                width: 240,
                height: 280
            }
        }
    },
    "X8E7FC": {
        type: "hoodie",
        quality: "Premium",
        name: 'Premium Unisex Hoodie',
        cost: 35,
        metadata: {
            type: "hoodie",
            quality: "basic",
            category: "sweater"
        },
        profit: 6,
        print: {
            front: 9,
            back: 9
        },
        delivery: 8,
        material: 'Regular fit, premium poly/cotton blend, white drawcords, unisex',
        sizes: ['XS', 'S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/hoodies/premium-front.png',
            back: '/imgs/clothes/hoodies/premium-back.png'
        },
        colors: ["Black"],
        printable: {
            front: {
                top: 150,
                width: 260,
                height: 200
            },
            back: {
                top: 170,
                width: 200,
                height: 300
            }
        }
    },

    "89CEF1": {
        type: "sweatshirt",
        name: 'Basic Unisex Sweatshirt',
        metadata: {
            type: "sweatshirt",
            quality: "basic",
            category: "sweater"
        },
        cost: 22,
        profit: 4,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Slim fit, cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/sweatshirts/normal-front.png',
            back: '/imgs/clothes/sweatshirts/normal-back.png'
        },
        colors: ["Red", "Blue", "Green", "Black"],
        printable: {
            front: {
                top: 130,
                width: 230,
                height: 300
            },
            back: {
                top: 120,
                width: 220,
                height: 360
            }
        }
    },
    "25X8E7": {
        type: "sweatshirt",
        quality: "Premium",
        name: 'Premium Unisex Sweatshirt',
        metadata: {
            type: "sweatshirt",
            quality: "premium",
            category: "sweater"
        },
        cost: 35,
        profit: 7,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Slim fit, premium soft cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/sweatshirts/premium-front.png',
            back: '/imgs/clothes/sweatshirts/premium-back.png'
        },
        colors: ["Black"],
        printable: {
            front: {
                top: 130,
                width: 230,
                height: 250
            },
            back: {
                top: 120,
                width: 190,
                height: 280
            }
        }
    },
    "NV7ECZ": {
        type: "long-tee",
        name: 'Classic Long Sleeve Tee',
        metadata: {
            type: "long-tee",
            quality: "basic",
            category: "tee"
        },
        cost: 12,
        profit: 3,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Regular fit, 100% cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/long-tee/long-tee-normal-front.png',
            back: '/imgs/clothes/long-tee/long-tee-normal-back.png'
        },
        colors: ["Black", "White", "Green"],
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
    "NF7ECX": {
        type: "t-shirt",
        name: 'Classic T-Shirt',
        metadata: {
            type: "t-shirt",
            quality: "premium",
            category: "tee"
        },
        cost: 10,
        profit: 2,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Regular fit, 100% cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/t-shirts/t-shirt-premium-front.png',
            back: '/imgs/clothes/t-shirts/t-shirt-premium-back.png'
        },
        colors: ["Black", "White", "Green", "Red"],
        printable: {
            front: {
                top: 130,
                width: 255,
                height: 300
            },
            back: {
                top: 120,
                width: 240,
                height: 330
            }
        }
    },
    "BEF7CZ": {
        type: "polo",
        name: 'Half Sleeve Polo',
        metadata: {
            type: "polo",
            quality: "basic",
            category: "half-sleeve"
        },
        cost: 19,
        profit: 4,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Regular fit, 100% cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/t-shirts/t-shirt-premium-front.png',
            back: '/imgs/clothes/t-shirts/t-shirt-premium-back.png'
        },
        colors: ["Black", "White", "Green", "Red"],
        printable: varprint
    },
    "HUF7BZ": {
        type: "polo",
        name: 'Long Sleeve Polo',
        metadata: {
            type: "polo",
            quality: "basic",
            category: "long-sleeve"
        },
        cost: 22,
        profit: 4,
        delivery: 8,
        print: {
            front: 9,
            back: 9
        },
        material: 'Regular fit, 100% cotton, unisex',
        sizes: ['S', 'M', 'L', 'X', 'XL'],
        imgs: {
            front: '/imgs/clothes/t-shirts/t-shirt-premium-front.png',
            back: '/imgs/clothes/t-shirts/t-shirt-premium-back.png'
        },
        colors: ["Black", "White", "Green", "Red"],
        printable: varprint
    },
}

export const phasedOut = {

}