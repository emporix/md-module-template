export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'ben', label: 'Ben Davis High School', color: '#00B8D9', isFixed: false },
  { value: 'pike', label: 'Pike High School', color: '#0052CC', isDisabled: false },
];

export interface FlavourOption {
  readonly value: string;
  readonly label: string;
  readonly rating: string;
}

export const flavourOptions: readonly FlavourOption[] = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export interface StateOption {
  readonly value: string;
  readonly label: string;
}

export const stateOptions: readonly StateOption[] = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FM', label: 'Federated States Of Micronesia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'GU', label: 'Guam' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PW', label: 'Palau' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VI', label: 'Virgin Islands' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export const optionLength = [
  { value: 1, label: 'general' },
  {
    value: 2,
    label:
      'Evil is the moment when I lack the strength to be true to the Good that compels me.',
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
];

export const dogOptions = [
  { id: 1, label: 'Chihuahua' },
  { id: 2, label: 'Bulldog' },
  { id: 3, label: 'Dachshund' },
  { id: 4, label: 'Akita' },
];

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export interface GroupedOption {
  readonly label: string;
  readonly options: readonly ColourOption[] | readonly FlavourOption[];
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];


export const companies = [
  {
    "type": "BILLING",
    "primary": true,
    "metadata": {
      "version": 1,
      "createdAt": "2025-03-05T19:53:23.613Z",
      "modifiedAt": "2025-03-05T19:53:23.613Z"
    },
    "id": "67c8abb31e531c66cd4534d3",
    "legalEntity": {
      "id": "38408",
      "name": "Ben Davis High School",
      "type": "COMPANY",
      "legalInfo": {
        "legalName": "Ben Davis High School",
        "registrationDate": "2009-12-10T00:00:00Z",
        "registrationAgency": "MIDDLE",
        "registrationId": "1812810",
        "countryOfRegistration": "US",
        "taxRegistrationNumber": "181281002028"
      },
      "customerGroups": [
        {
          "id": "f5f21cc1-e08a-4365-99ce-0852cb1bdd13",
          "name": {
            "en": "Ben Davis High School",
            "fr": "Ben Davis High School"
          }
        }
      ],
      "metadata": {
        "version": 2,
        "createdAt": "2025-03-05T19:53:22.533Z",
        "modifiedAt": "2025-03-05T19:53:22.929Z"
      },
      "entitiesAddresses": [
        {
          "id": "67c8abb21e531c66cd4534d1",
          "name": "Ben Davis High School",
          "type": "HEADQUARTER",
          "contactDetails": {
            "addressLine1": "1200 N GIRLS SCH RD",
            "city": "INDIANAPOLIS",
            "state": "IN",
            "postcode": "46214",
            "countryCode": "US",
            "tags": [
              "shipping",
              "billing"
            ]
          },
          "metadata": {
            "version": 1,
            "createdAt": "2025-03-05T19:53:22.814Z",
            "modifiedAt": "2025-03-05T19:53:22.814Z"
          }
        }
      ]
    },
    "customer": {
      "id": "64656995",
      "name": "John",
      "surname": "Johnson",
      "email": "john.johnson@bendavishighschool.com",
      "phone": "(317) 988-7000",
      "type": "CONTACT"
    }
  },
  [
    {
      "type": "BILLING",
      "primary": true,
      "metadata": {
        "version": 1,
        "createdAt": "2025-03-05T19:53:23.564Z",
        "modifiedAt": "2025-03-05T19:53:23.564Z"
      },
      "id": "67c8abb31e531c66cd4534d2",
      "legalEntity": {
        "id": "6515",
        "name": "Pike High School",
        "type": "COMPANY",
        "legalInfo": {
          "legalName": "Pike High School",
          "registrationDate": "2009-10-13T00:00:00Z",
          "registrationAgency": "HIGH",
          "registrationId": "1808910",
          "countryOfRegistration": "US",
          "taxRegistrationNumber": "180891001489"
        },
        "customerGroups": [
          {
            "id": "1037049b-4c02-4a39-afe4-07bc365af824",
            "name": {
              "en": "Pike High School",
              "fr": "Pike High School"
            }
          }
        ],
        "metadata": {
          "version": 2,
          "createdAt": "2025-03-05T19:53:22.530Z",
          "modifiedAt": "2025-03-05T19:53:22.973Z"
        },
        "entitiesAddresses": [
          {
            "id": "67c8abb27976077f1880a4d3",
            "name": "Pike High School",
            "type": "HEADQUARTER",
            "contactDetails": {
              "addressLine1": "5401 W 71ST ST",
              "city": "INDIANAPOLIS",
              "state": "IN",
              "postcode": "46268",
              "countryCode": "US",
              "tags": [
                "shipping",
                "billing"
              ]
            },
            "metadata": {
              "version": 1,
              "createdAt": "2025-03-05T19:53:22.852Z",
              "modifiedAt": "2025-03-05T19:53:22.852Z"
            }
          }
        ]
      },
      "customer": {
        "id": "45054805",
        "name": "David",
        "surname": "Brown",
        "email": "david.brown@pikehighschool.com",
        "phone": "(317) 291-5250",
        "type": "CONTACT"
      }
    }
  ]
]
