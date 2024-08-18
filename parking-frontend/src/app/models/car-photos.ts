export interface CarPhotos {
    [make: string]: {
        [model: string]: string;
    };
}

export const CarPhotos: CarPhotos = {
    Audi: {
        A3: 'https://flib.carshow360.net/900/800/9048757bd8dda5f87f7b.webp',
        A4: 'https://flib.carshow360.net/900/800/9048757bd8dda5f87f7b.webp',
        A6: 'https://flib.carshow360.net/800/700/87976431f748843a9adb.webp',
        Q3: 'https://flib.carshow360.net/700/100/7041270b90adb5d46fab.webp'
    },
    BMW: {
        M3:'https://flib.carshow360.net/800/100/8971092868c4c665cdab.webp',
        M4:'https://flib.carshow360.net/800/800/899872d5a047cb7db3ab.webp',
        M5:'https://flib.carshow360.net/800/600/897673ac75ad49cafd2b.webp',
        X1:'https://flib.carshow360.net/800/600/832621c6c81850fca54b.webp',
        X3:'https://flib.carshow360.net/700/000/768014986ebfb035984b.webp'
    },
    Ford: {
        Focus:'https://flib.carshow360.net/800/700/89577618dcd705ddb80b.webp',
        Mustang:'https://flib.carshow360.net/800/000/806015a9f09547a7851b.webp',
        Bronco:'https://flib.carshow360.net/800/000/876061b857181d7caedb.webp',
        Kuga:'https://flib.carshow360.net/800/000/884067a6a510b787066b.webp',
        Puma:'https://flib.carshow360.net/800/300/89033857fb74937a0e3b.webp',
        Ranger:'https://flib.carshow360.net/900/600/90866143f30bb34ddfbb.webp'
    },
    Honda: {
        Civic:'https://flib.carshow360.net/800/200/846245a2c9fd59f024cb.webp',
        Jazz:'https://flib.carshow360.net/800/700/8627777f3d3d83214d8b.webp',
        CRV:'https://flib.carshow360.net/800/900/8819054ec8cf5a8f27bb.webp',
        HRV:'https://flib.carshow360.net/800/200/806230234e80d1f9881b.webp'
    },
    Toyota: {
        Corolla:'https://flib.carshow360.net/800/600/867643ee7d55a964b34b.webp',
        Camry:'https://flib.carshow360.net/800/000/847010e51922dbe7686b.webp',
        RAV4:'https://flib.carshow360.net/800/300/8093052d542a3de9424b.webp',
        Highlander:'https://flib.carshow360.net/700/700/71577851a9145704732b.webp'
    }
};