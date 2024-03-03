import { bookTour, seeLocationTour } from '../src/index';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData), // Replace mockData with your test data
    })
);

let localStorageMock = {};
global.localStorage = {
    setItem: (key, value) => {
        localStorageMock[key] = value;
    },
    getItem: key => localStorageMock[key],
};

const mockData = [
    {
        title: 'Tour 1',
        days: 5,
        price: 500,
        description: 'Description of Tour 1',
        maps: { from: 'location1', to: 'location2' },
        km: 100,
    },
];

beforeEach(() => {
    localStorageMock = {};
});

describe('App', () => {
    describe('bookTour', () => {
        test('should add the selected tour to the cart and localStorage', async () => {
            await bookTour(0);

            expect(localStorageMock.tours).toBeDefined();

            const cart = JSON.parse(localStorageMock.tours);
            expect(cart.length).toBe(1);
            expect(cart[0].title).toBe('Tour 1');
        });
    });

    describe('seeLocationTour', () => {
        test('should update the index variable', () => {
            seeLocationTour(1);

            expect(index).toBe(1);
        });
    });
});
