interface CarProperties {
  name: string;
  color: string;
}

const DUMMY_BRANDS = [
  'Acura',
  'Alfa Romeo',
  'AMC',
  'Aston Martin',
  'Avanti',
  'Bentley',
  'BMW',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Daewoo',
  'DeLorean'
];

const DUMMY_MODELS = [
  "400",
  "600",
  "Aries",
  "Avenger",
  "Caliber",
  "Caravan",
  "Challenger",
  "Charger",
  "Colt",
  "Conquest",
  "D/W Truck",
  "Dakota",
  "Dart",
  "Daytona",
  "Diplomat",
  "Durango",
  "Dynasty",
  "Grand Caravan",
  "Intrepid",
  "Journey",
  "Lancer",
  "Magnum",
  "Mirada",
  "Monaco",
  "Neon",
  "Nitro",
  "Omni",
  "Raider",
  "Ram 1500 Truck",
];

const getRandomIndexBelow = (limit: number): number => {
  return Math.floor(Math.random() * limit);
}

const getRandomColorPartValue = (): number => Math.floor(Math.random() * 256);

const getRandomColor = (): string => {
  const r = getRandomColorPartValue().toString(16);
  const g = getRandomColorPartValue().toString(16);
  const b = getRandomColorPartValue().toString(16);

  const color = `#${r}${g}${b}`;

  return color;
}

export default class RandomCarService {
  static instance: RandomCarService | null;

  brands: string[] = DUMMY_BRANDS;
  models: string[] = DUMMY_MODELS;

  static getInstance() {
    if (RandomCarService.instance === null) {
      RandomCarService.instance = new RandomCarService;
    }

    return RandomCarService.instance;
  }

  nextCarProperties(): CarProperties {
    const bransCount = this.brands.length;
    const modelsCount = this.models.length;
    const brandIndex = getRandomIndexBelow(bransCount);
    const modelIndex = getRandomIndexBelow(modelsCount);

    const name = `${this.brands[brandIndex]} ${this.models[modelIndex]}`;
    const color = getRandomColor();

    return {
      name,
      color
    }
  }
}
