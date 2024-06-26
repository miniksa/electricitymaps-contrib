import useGetState from 'api/getState';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { ExchangeArrowData, StateExchangeData } from 'types';
import { SpatialAggregate } from 'utils/constants';
import { selectedDatetimeIndexAtom, spatialAggregateAtom } from 'utils/state/atoms';

import exchangesConfigJSON from '../../config/exchanges.json'; // do something globally
import exchangesToExclude from '../../config/excluded_aggregated_exchanges.json'; // do something globally

const exchangesConfig: Record<string, any> = exchangesConfigJSON;
const { exchangesToExcludeZoneView, exchangesToExcludeCountryView } = exchangesToExclude;

export function filterExchanges(
  exchanges: Record<string, StateExchangeData>,
  exclusionArrayZones: string[],
  exclusionArrayCountries: string[]
) {
  const exclusionSetZones = new Set(exclusionArrayZones);
  const exclusionSetCountries = new Set(exclusionArrayCountries);
  const resultZones: Record<string, StateExchangeData> = {};
  const resultCountries: Record<string, StateExchangeData> = {};
  // Loop through the exchanges and assign them to the correct result object
  for (const [key, value] of Object.entries(exchanges)) {
    if (exclusionSetCountries.has(key)) {
      resultZones[key] = value;
    } else if (exclusionSetZones.has(key)) {
      resultCountries[key] = value;
    } else {
      resultZones[key] = value;
      resultCountries[key] = value;
    }
  }

  return [resultZones, resultCountries];
}

export function useExchangeArrowsData(): ExchangeArrowData[] {
  const [selectedDatetime] = useAtom(selectedDatetimeIndexAtom);
  const [viewMode] = useAtom(spatialAggregateAtom);
  const { data } = useGetState();

  const exchangesToUse: { [key: string]: StateExchangeData } = useMemo(() => {
    const exchanges = data?.data?.datetimes?.[selectedDatetime?.datetimeString]?.e;

    if (!exchanges) {
      return {};
    }

    const [zoneViewExchanges, countryViewExchanges] = filterExchanges(
      exchanges,
      exchangesToExcludeZoneView,
      exchangesToExcludeCountryView
    );

    return viewMode === SpatialAggregate.COUNTRY
      ? countryViewExchanges
      : zoneViewExchanges;
  }, [data, selectedDatetime, viewMode]);

  const currentExchanges: ExchangeArrowData[] = useMemo(() => {
    return Object.entries(exchangesToUse).map(([key, value]) => ({
      co2intensity: value.ci,
      netFlow: value.f,
      ...exchangesConfig[key],
      key,
    }));
  }, [exchangesToUse]);

  return currentExchanges;
}
