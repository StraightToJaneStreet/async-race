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

interface StartEngineResponseBody {
  velocity: number;
  distance: number;
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
  params: EngineControlParams
) => {
  const baseEndpoint = createURI(protocol, host, path);
  const queryParamsSuffix = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join(QUERY_PARAMS_DELIMITER);

  return `${baseEndpoint}?${queryParamsSuffix}`;
}

export default class EngineApiService {
  protocol: Protocol = Protocol.HTTP;
  address = `${DEFAULT_API_ADDRESS}:${DEFAULT_API_PORT}`;

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
