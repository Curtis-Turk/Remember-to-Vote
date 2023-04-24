import axios, { AxiosResponse } from 'axios';

interface addressObject {
  address: string;
  postcode: string;
  slug: string;
}

interface responseAddressObject extends addressObject {
  url: string;
}

interface pollingStationsObject {
  pollingStationFound: boolean;
  pollingStations: addressObject[];
  errorMessage?: string;
}

export default class ElectoralCommisionApi {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /* fetches polling station information from the Electoral Commision Api
  EC endpoint information and response examples: https://api.electoralcommission.org.uk/docs/ */
  async verifyPostcode(postcode: string): Promise<pollingStationsObject> {
    try {
      const response = (await axios.get(
        `https://api.electoralcommission.org.uk/api/v1/postcode/${postcode}?token=${this.apiKey}`
        // axios will timeout after 5 seconds
        // { timeout: 5 }
      )) as AxiosResponse;

      const result = response.data;

      if (result.dates.length)
        return {
          pollingStationFound: true,
          pollingStations: [],
        };

      if (result.address_picker) {
        const pollingStations = result.addresses.map((addressObject: responseAddressObject) => {
          const { address, postcode, slug } = addressObject;
          return { address, postcode, slug };
        });
        return {
          pollingStationFound: false,
          pollingStations,
        };
      }

      return {
        pollingStationFound: false,
        pollingStations: [],
      };
    } catch (e: any) {
      const errorMessage =
        e.response && e.response.data.error === 'Could not geocode from any source'
          ? e.response?.data.error
          : 'Connection issue whilst verifying postcode';
      return { errorMessage, pollingStationFound: false, pollingStations: [] };
    }
  }

  /* getting a polling station once addressPicker step has been completed */
  async verifyAddress(addressSlug: string): Promise<pollingStationsObject> {
    try {
      const response = (await axios.get(
        `https://api.electoralcommission.org.uk/api/v1/address/${addressSlug}?token=${this.apiKey}`
        // axios will timeout after 5 seconds
        // { timeout: 5 }
      )) as AxiosResponse;

      const result = response.data;

      if (result.dates.length)
        return {
          pollingStationFound: true,
          pollingStations: [],
        };

      return {
        pollingStationFound: false,
        pollingStations: [],
      };
    } catch (e: any) {
      const errorMessage =
        e.response && e.response.data.error === 'Could not geocode from any source'
          ? e.response?.data.error
          : 'Connection issue whilst verifying postcode';
      return { errorMessage, pollingStationFound: false, pollingStations: [] };
    }
  }

  async getPollingStation(request: { postcode: string; address_slug: string }) {
    console.log(
      '🚀 ~ file: electoralCommisionApi.tsx:99 ~ ElectoralCommisionApi ~ getPollingStationAddressInfo ~ postcode:',
      request.postcode
    );

    let response;

    if (request.address_slug !== '') {
      response = await fetch(
        `https://api.electoralcommission.org.uk/api/v1/address/${request.address_slug}?token=${this.apiKey}`
      );
    } else {
      response = await fetch(
        `https://api.electoralcommission.org.uk/api/v1/postcode/${request.postcode}?token=${this.apiKey}`
      );
    }
    const result = await response.json();
    if (result.dates.length)
      // return the properties object with postcode and address string values if polling data exists
      return result.dates[0].polling_station.station.properties;
    if (result.address_picker)
      // throw an error if multiple addresses were returned for the supplied postcode
      throw Error('Electoral Commision API returned address picker');
    // throw an error if no polling data exists for the supplied postcode
    throw Error('EC API returned no polling info');
  }
}
