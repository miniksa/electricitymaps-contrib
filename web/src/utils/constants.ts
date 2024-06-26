import type { Duration } from 'date-fns';
import { ElectricityModeType } from 'types';

// The order here determines the order displayed
export enum TimeAverages {
  HOURLY = 'hourly',
  DAILY = 'daily',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum ToggleOptions {
  ON = 'on',
  OFF = 'off',
}

export enum ThemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export enum Mode {
  CONSUMPTION = 'consumption',
  PRODUCTION = 'production',
}

export enum SpatialAggregate {
  COUNTRY = 'country',
  ZONE = 'zone',
}

export enum LeftPanelToggleOptions {
  ELECTRICITY = 'electricity',
  EMISSIONS = 'emissions',
}

export enum TrackEvent {
  DATA_SOURCES_CLICKED = 'Data Sources Clicked',
}

// Production/imports-exports mode
export const modeColor: { [mode in ElectricityModeType]: string } = {
  solar: '#f27406',
  wind: '#74cdb9',
  hydro: '#2772b2',
  'hydro storage': '#0052cc',
  'battery storage': '#b76bcf',
  biomass: '#166a57',
  geothermal: 'yellow',
  nuclear: '#AEB800',
  gas: '#bb2f51',
  coal: '#ac8c35',
  oil: '#867d66',
  unknown: '#ACACAC',
};

export const modeOrder = [
  'nuclear',
  'geothermal',
  'biomass',
  'coal',
  'wind',
  'solar',
  'hydro',
  'hydro storage',
  'battery storage',
  'gas',
  'oil',
  'unknown',
] as const;

//A mapping between the TimeAverages enum and the corresponding Duration for the date-fns add/substract method
export const timeAxisMapping: Record<TimeAverages, keyof Duration> = {
  daily: 'days',
  hourly: 'hours',
  monthly: 'months',
  yearly: 'years',
};
