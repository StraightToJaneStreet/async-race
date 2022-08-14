export interface HandleRacingVictoryParams {
  id: number;
  time: number;
}

interface IWinnerService {
  handleRacingVictory(params: HandleRacingVictoryParams): void;
}

export default IWinnerService;
