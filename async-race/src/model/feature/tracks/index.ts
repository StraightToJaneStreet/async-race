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
  completedTrackPercent: number;
  carId: number;
  distance: number;
}

interface RunningTrackParams {
  stateParams: RunningStateParams;
  completedTrackPercent: number;
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

export const selectllTracks = (state: TrackParamsState): TrackParams[] =>
  adapter.getSelectors().selectAll(state);

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
export const actionResetAllTracks = factory<void, 'resetAllTracks'>('resetAllTracks');
export const actionBrokeCarOnTrack = factory<number, 'brokeCarOnTrack'>('brokeCarOnTrack');
export const actionTrackFinished = factory<number, 'trackFinished'>('trackFinished');
export const actionUpdateProgress = factory<void, 'updateProgress'>('updateProgress');

const initialState = adapter.getInitialState();

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionInitializeTrack, (state, { payload }) => {
      const { velocity, distance, carId } = payload;

      const currentTimestamp = performance.now();

      const track: TrackParams = {
        stateParams: createRunningStateParams(velocity, currentTimestamp),
        completedTrackPercent: 0,
        carId,
        distance
      }

      adapter.addOne(state, track);
    })

    .addCase(actionResetTrack, (state, { payload }) => {
      adapter.removeOne(state, payload);
    })

    .addCase(actionResetAllTracks, (state) => {
      adapter.removeAll(state);
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

    .addCase(actionUpdateProgress, (state) => {

      const tracks = adapter.getSelectors().selectAll(state);

      const updates = tracks
        .filter(isRunning)
        .map((track) => {
          const expectedTime = track.distance / track.stateParams.velocity;
          const actualTime = performance.now() - track.stateParams.startTimestamp;
          const percentage =
            actualTime >= expectedTime ? 100
            : actualTime === 0
              ? 0
              : actualTime / expectedTime * 100;
          const changes: Partial<TrackParams> = {
            completedTrackPercent: percentage
          }
          const udpate: Update<TrackParams> = {
            id: track.carId,
            changes
          }
          return udpate;
        });
      adapter.updateMany(state, updates);
    })
});

const isRunning = (track: TrackParams): track is RunningTrackParams => track.stateParams.state === TrackStateVariants.Running;

export default reducer;
