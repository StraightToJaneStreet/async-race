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

enum EngineMode {
  Started = 'started',
  Drive = 'drive',
  Stopped = 'stopped',
}

interface EngineControlParams {
  id: string,
  status: EngineMode
}

interface QueryParams {
  [k: string]: string;
}

const QUERY_PARAMS_DELIMITER = '&';

const createURIWithQueryParams = (
  protocol: Protocol,
  host: string,
  path: string,
  params: QueryParams | EngineControlParams
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
    const params: EngineControlParams = {
      id: `${carId}`,
      status: EngineMode.Started
    }

    const endpoint = createURIWithQueryParams(this.protocol, this.address, this.pointEngine, params);

    const result = fetch(endpoint, {
      method: HTTPMethod.PATCH,
    })
      .then((response) => response.json() as Promise<StartEngineResponseBody>);

    return result;
  }

  stopEngine(carId: number) {
    const params: EngineControlParams = {      
      id: `${carId}`,
      status: EngineMode.Stopped
    };

    const endpoint = createURIWithQueryParams(this.protocol, this.address, this.pointEngine, params);

    return fetch(endpoint, {
      method: HTTPMethod.PATCH      
    });
  }

  loadCars(): Promise<Car[]> {
    const endpoint = createURI(this.protocol, this.address, this.pointGarage);

    return fetch(endpoint, { method: HTTPMethod.GET })
      .then((response) => response.json())
      .then((cars: LoadCarsResponse) => cars);
  }

  setEngineDriveMode(carId: number): Promise<boolean> {
    const params: EngineControlParams =  {
      id: `${carId}`,
      status: EngineMode.Drive
    }

    const endpoint = createURIWithQueryParams(this.protocol, this.address, this.pointEngine, params);

    return fetch(endpoint, { method: HTTPMethod.PATCH })
      .then((response) => response.ok);
  }

}
