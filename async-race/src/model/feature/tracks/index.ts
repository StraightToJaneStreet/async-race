import { createEntityAdapter, createReducer, EntityState, Update } from "@reduxjs/toolkit";
import { createActionCreatorFactory } from "../../utils";

export enum TrackStateVariants {
  Running,
  Finished,
  Broken
}

export interface RunningStateParams {
  state: TrackStateVariants.Running;
  velocity: number;
  startTimestamp: number;
}

export interface BrokenStateParams {
  state: TrackStateVariants.Broken;
}

export interface FinishedStateParams {
  state: TrackStateVariants.Finished;
  duration: number;
}

export type TrackStateParams = RunningStateParams | BrokenStateParams | FinishedStateParams

export interface TrackParams {
  stateParams: TrackStateParams;
  carId: number;
  distance: number;
}

export interface TrackInitializationParams {
  carId: number;
  velocity: number;
  distance: number;
}

export type TrackParamsState = EntityState<TrackParams>;

const adapter = createEntityAdapter<TrackParams>({
  selectId: (item) => item.carId
});

export const selectTrack = (state: TrackParamsState, carId: number): TrackParams | undefined =>
  adapter.getSelectors().selectById(state, carId);

const createRunningStateParams = (velocity: number, startTimestamp: number): RunningStateParams => ({
  state: TrackStateVariants.Running,
  velocity,
  startTimestamp
});

const createBrokenStateParams = (): BrokenStateParams => ({
  state: TrackStateVariants.Broken
});

const createFinishedStateParams = (duration: number): FinishedStateParams => ({
  state: TrackStateVariants.Finished,
  duration
})

const factory = createActionCreatorFactory<'tracks'>('tracks');

export const actionInitializeTrack = factory<TrackInitializationParams, 'initializeTrack'>('initializeTrack');
export const actionResetTrack = factory<number, 'removeItem'>('removeItem');
export const actionBrokeCarOnTrack = factory<number, 'brokeCarOnTrack'>('brokeCarOnTrack');
export const actionTrackFinished = factory<number, 'trackFinished'>('trackFinished');

const initialState = adapter.getInitialState();

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionInitializeTrack, (state, { payload }) => {
      const { velocity, distance, carId } = payload;

      const currentTimestamp = performance.now();

      const track: TrackParams = {
        stateParams: createRunningStateParams(velocity, currentTimestamp),
        carId,
        distance
      }

      adapter.addOne(state, track);
    })

    .addCase(actionResetTrack, (state, { payload }) => {
      adapter.removeOne(state, payload);      
    })

    .addCase(actionBrokeCarOnTrack, (state, { payload }) => {
      const oldState = selectTrack(state, payload);
      if (oldState === undefined) {
        return;
      }      

      const changes: Partial<TrackParams> = {
        stateParams: createBrokenStateParams()
      }
      const update: Update<TrackParams> = { id: payload, changes };

      adapter.updateOne(state, update);
    })

    .addCase(actionTrackFinished, (state, { payload }) => {
      const oldState = selectTrack(state, payload);
      if (oldState === undefined || oldState.stateParams.state !== TrackStateVariants.Running) {
        return;
      }

      const startStamp = oldState.stateParams.startTimestamp;
      const currentStamp = performance.now();
      const duration = Math.floor((currentStamp - startStamp) / 1000);

      const changes: Partial<TrackParams> = {
        stateParams: createFinishedStateParams(duration)
      }
      const update: Update<TrackParams> = { id: payload, changes };
      
      adapter.updateOne(state, update);
    })
});

export default reducer;