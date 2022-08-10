const DEFAULT_API_ADDRESS = 'localhost';
const DEFAULT_API_PORT = '3000';

enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

enum Protocol {
  HTTP = 'http',
  HTTPS = 'https'
};

enum Endpoints {
  Garage = 'garage',
  Engine = 'engine',
  Winners = 'winners'
}

enum EngineMode {
  Started = 'started',
  Drive = 'drive',
  Stopped = 'stopped',
}

interface CarParams {
  name: string;
  color: string;
}

interface CarResponseBody extends CarParams {
  id: number;
}

interface StartEngineResponseBody {
  velocity: number;
  distance: number;
}

interface WinnerParams {
  wins: number;
  time: number;
}

interface WinnerResponseParams extends WinnerParams {
  id: number;
}

interface EngineControlParams {
  id: string,
  status: EngineMode
}

const QUERY_PARAMS_DELIMITER = '&';

const createURI = (protocol: Protocol, host: string, path: string) => {
  return `${protocol}://${host}/${path}`;
}

const createURIWithQueryParams = (
  protocol: Protocol,
  host: string,
  path: string,
  params: WinnerParams | EngineControlParams
) => {
  const baseEndpoint = createURI(protocol, host, path);
  const queryParamsSuffix = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join(QUERY_PARAMS_DELIMITER);

  return `${baseEndpoint}?${queryParamsSuffix}`;
}

export default class ApiService {
  protocol: Protocol = Protocol.HTTP;
  address = `${DEFAULT_API_ADDRESS}:${DEFAULT_API_PORT}`;

  protected static instance: ApiService | null = null;

  protected constructor() { }

  static getInstance() {
    if (ApiService.instance === null) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  createCar(name: string, color: string): Promise<number> {
    const endpoint = createURI(this.protocol, this.address, Endpoints.Garage);

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
      .then(response => response.json() as Promise<CarResponseBody>)
      .then((body) =>body.id);

    return result;
  }

  removeCar(carId: number) {
    const pointWithId = `${Endpoints.Garage}/${carId}`;
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

    const endpoint = createURIWithQueryParams(this.protocol, this.address, Endpoints.Engine, params);

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

    const endpoint = createURIWithQueryParams(this.protocol, this.address, Endpoints.Engine, params);

    return fetch(endpoint, {
      method: HTTPMethod.PATCH      
    });
  }

  loadCars(): Promise<CarResponseBody[]> {
    const endpoint = createURI(this.protocol, this.address, Endpoints.Garage);

    return fetch(endpoint, { method: HTTPMethod.GET })
      .then((response) => response.json());
  }

  loadWinners(): Promise<WinnerResponseParams[]> {
    const endpoint = createURI(this.protocol, this.address, Endpoints.Garage);

    return fetch(endpoint, { method: HTTPMethod.GET })
      .then((response) => response.json());
  }

  updateWinner(id: number, params: WinnerParams) {
    const path = `${Endpoints.Winners}/${id}`;
    const endpoint = createURI(this.protocol, this.address, path);
    return fetch(endpoint, {
      method: HTTPMethod.PUT,
      body: JSON.stringify(params)
    })
  }

  setEngineDriveMode(carId: number): Promise<boolean> {
    const params: EngineControlParams =  {
      id: `${carId}`,
      status: EngineMode.Drive
    }

    const endpoint = createURIWithQueryParams(this.protocol, this.address, Endpoints.Engine, params);

    return fetch(endpoint, { method: HTTPMethod.PATCH })
      .then((response) => response.ok);
  }

}
