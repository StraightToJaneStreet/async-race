interface IEngineAPIService {
  startEngine(id: number): void;
  stopEngine(id: number): void;
  setEngineDriveMode(id: number): void;
}
export default IEngineAPIService;
