export const mockECresponse = {
  address_picker: false,
  addresses: [],
  dates: [
    {
      date: '2017-05-04',
      polling_station: {
        polling_station_known: true,
        custom_finder: null,
        report_problem_url:
          'http://wheredoivote.co.uk/report_problem/?source=testing&source_url=testing',
        station: {
          id: 'w06000015.QK',
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-3.119229, 51.510885],
          },
          properties: {
            postcode: '',
            address: 'Earlswood Social Club, 160-164 Greenway Road, Rumney',
          },
        },
      },
      advance_voting_station: null,
      notifications: [
        {
          title: 'Some unexpected event is happening',
          type: 'cancelled_election',
          detail: 'Some more details',
          url: 'https://foo.bar/baz',
        },
      ],
      ballots: [
        {
          ballot_paper_id: 'local.cardiff.pontprennauold-st-mellons.2017-05-04',
          ballot_title: 'Cardiff local election Pontprennau/Old St. Mellons',
          ballot_url:
            'https://developers.democracyclub.org.uk/api/v1/local.cardiff.pontprennauold-st-mellons.2017-05-04/',
          poll_open_date: '2017-05-04',
          elected_role: 'Local Councillor',
          metadata: null,
          cancelled: false,
          replaced_by: null,
          replaces: null,
          election_id: 'local.cardiff.2017-05-04',
          election_name: 'Cardiff local election',
          post_name: 'Pontprennau/Old St. Mellons',
          candidates_verified: false,
          voting_system: {
            slug: 'FPTP',
            name: 'First-past-the-post',
            uses_party_lists: false,
          },
          seats_contested: 1,
          candidates: [
            {
              list_position: null,
              party: {
                party_id: 'party:90',
                party_name: 'Liberal Democrats',
              },
              person: {
                ynr_id: 23417,
                name: 'David Keigwin',
                absolute_url: 'https://whocanivotefor.co.uk/person/23417/david-keigwin',
                email: 'dave@example.com',
                photo_url: null,
              },
            },
            {
              list_position: null,
              party: {
                party_id: 'party:52',
                party_name: 'Conservative and Unionist Party',
              },
              person: {
                ynr_id: 8071,
                name: 'Joel Williams',
                absolute_url: 'https://whocanivotefor.co.uk/person/8071/joel-williams',
                email: null,
                photo_url:
                  'https://static-candidates.democracyclub.org.uk/media/images/images/8071.png',
              },
            },
          ],
          wcivf_url:
            'https://whocanivotefor.co.uk/elections/local.cardiff.2017-05-04/post-UTE:W05000900/pontprennauold-st-mellons',
        },
      ],
    },
  ],
  electoral_services: {
    council_id: 'W06000015',
    name: 'Cardiff Council',
    nation: 'Wales',
    address:
      'Electoral Registration Officer\\nCity of Cardiff Council\\nCounty Hall Atlantic Wharf',
    postcode: 'CF10 4UW',
    email: 'electoralservices@cardiff.gov.uk',
    phone: '029 2087 2034',
    website: 'http://www.cardiff.gov.uk/',
  },
  registration: {
    address:
      'Electoral Registration Officer\\nCity of Cardiff Council\\nCounty Hall Atlantic Wharf',
    postcode: 'CF10 4UW',
    email: 'electoralservices@cardiff.gov.uk',
    phone: '029 2087 2034',
    website: 'http://www.cardiff.gov.uk/',
  },
  postcode_location: {
    type: 'Feature',
    properties: null,
    geometry: {
      type: 'Point',
      coordinates: [-3.113797, 51.521175],
    },
  },
};
