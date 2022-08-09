import { Car } from "../core/Car";

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface CreateCarResponseBody {
  name: string;
  color: string;
  id: number;
}

interface StartEngineResponseBody {
  velocity: number;
  distance: number;
}

type LoadCarsResponse = Car[];

type Protocol = 'http' | 'https';

const createURI = (protocol: Protocol, host: string, path: string) => {
  return `${protocol}://${host}/${path}`;
}

interface StartEngineParams {
  id: string,
  status: 'started' | 'stopped'
}

interface SetDriveModeParams {
  id: string;
  status: 'drive';
}

interface QueryParams {
  [k: string]: string;
}

const QUERY_PARAMS_DELIMITER = '&';

const createURIWithQueryParams = (
  protocol: Protocol,
  host: string,
  path: string,
  params: QueryParams | StartEngineParams | SetDriveModeParams
) => {
  const baseEndpoint = createURI(protocol, host, path);
  const queryParamsSuffix = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join(QUERY_PARAMS_DELIMITER);

  return `${baseEndpoint}?${queryParamsSuffix}`;
}

export default class ApiService {
  protocol: Protocol = 'http';
  address = 'localhost:3000';

  pointGarage = 'garage';
  pointWinners = 'winners';
  pointEngine = 'engine';

  static instance: ApiService | null = null;

  private constructor() { }

  static getInstance() {
    if (ApiService.instance === null) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  createCar(name: string, color: string): Promise<number> {
    const endpoint = createURI(this.protocol, this.address, this.pointGarage);

    const data = new FormData();
    data.set('name', name);
    data.set('color', color);
    
    const requestBody = JSON.stringify(Object.fromEntries(data));

    const options: RequestInit =  {
      headers: {
        'Content-Type': 'application/json'
      },
      method: HTTPMethod.POST,
      body: requestBody
    }

    const result = fetch(endpoint, options)
      .then(response => response.json() as Promise<CreateCarResponseBody>)
      .then((body) =>body.id);

    return result;
  }

  removeCar(carId: number) {
    const pointWithId = `${this.pointGarage}/${carId}`;
    const endpoint = createURI(this.protocol, this.address, pointWithId);

    return fetch(endpoint, {
      method: HTTPMethod.DELETE
    });
  }

  startEngine(carId: number): Promise<StartEngineResponseBody> {
    const params: StartEngineParams = {
      id: `${carId}`,
      status: 'started'
    }

    const endpoint = createURIWithQueryParams(this.protocol, this.address, this.pointEngine, params);

    const result = fetch(endpoint, { method: HTTPMethod.PATCH })
      .then((response) => response.json() as Promise<StartEngineResponseBody>);

    return result;
  }

  loadCars(): Promise<Car[]> {
    const endpoint = createURI(this.protocol, this.address, this.pointGarage);

    return fetch(endpoint, { method: HTTPMethod.GET })
      .then((response) => response.json())
      .then((cars: LoadCarsResponse) => cars);
  }

  setEngineDriveMode(carId: number): Promise<boolean> {
    const params: SetDriveModeParams =  {
      id: `${carId}`,
      status: 'drive'
    }
    const endpoint = createURIWithQueryParams(this.protocol, this.address, this.pointEngine, params);

    return fetch(endpoint, { method: HTTPMethod.PATCH })
      .then((response) => response.ok);
  }

}
