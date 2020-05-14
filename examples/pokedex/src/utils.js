import {useCallback} from 'react';

// Return the filter.
export function useFilter(name, type) {
  name = name.toLowerCase();
  type = type.toLowerCase();

  return useCallback(
    function (data) {
      var isSearchMatch = !name
        ? true
        : data.name.toLowerCase().indexOf(name) > -1;
      var isFilterMatch = type === 'all' ? true : data.type.indexOf(type) > -1;
      return isSearchMatch && isFilterMatch;
    },
    [name, type]
  );
}

// The list of pokemons.
export const Pokedex = {
  cardInfo: ['Type', 'Name', 'Number'],
  types: [
    'All',
    'Bug',
    'Dragon',
    'Electric',
    'Fighting',
    'Fire',
    'Flying',
    'Ghost',
    'Grass',
    'Ground',
    'Ice',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Water',
  ],
  cards: [
    {
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      number: '001',
      pokedexIndex: '1',
    },
    {
      name: 'Ivysaur',
      types: ['grass', 'poison'],
      number: '002',
      pokedexIndex: '2',
    },
    {
      name: 'Venusaur',
      types: ['grass', 'poison'],
      number: '003',
      pokedexIndex: '3',
    },
    {
      name: 'Mega Venusaur',
      types: ['grass', 'poison'],
      number: '003',
      pokedexIndex: '4',
    },
    {
      name: 'Charmander',
      types: ['fire'],
      number: '004',
      pokedexIndex: '5',
    },
    {
      name: 'Charmeleon',
      types: ['fire'],
      number: '005',
      pokedexIndex: '6',
    },
    {
      name: 'Charizard',
      types: ['fire', 'flying'],
      number: '006',
      pokedexIndex: '7',
    },
    {
      name: 'Mega Charizard Y',
      types: ['fire', 'flying'],
      number: '006',
      pokedexIndex: '9',
    },
    {
      name: 'Mega Charizard X',
      types: ['fire', 'dragon'],
      number: '006',
      pokedexIndex: '8',
    },
    {
      name: 'Squirtle',
      types: ['water'],
      number: '007',
      pokedexIndex: '10',
    },
    {
      name: 'Wartortle',
      types: ['water'],
      number: '008',
      pokedexIndex: '11',
    },
    {
      name: 'Blastoise',
      types: ['water'],
      number: '009',
      pokedexIndex: '12',
    },
    {
      name: 'Mega Blastoise',
      types: ['water'],
      number: '009',
      pokedexIndex: '13',
    },
    {
      name: 'Pikachu',
      types: ['electric'],
      number: '025',
      pokedexIndex: '33',
    },
    {
      name: 'Raichu',
      types: ['electric'],
      number: '026',
      pokedexIndex: '34',
    },
    {
      name: 'Mankey',
      types: ['fighting'],
      number: '056',
      pokedexIndex: '70',
    },
    {
      name: 'Primeape',
      types: ['fighting'],
      number: '057',
      pokedexIndex: '71',
    },
    {
      name: 'Growlithe',
      types: ['fire'],
      number: '058',
      pokedexIndex: '72',
    },
    {
      name: 'Arcanine',
      types: ['fire'],
      number: '059',
      pokedexIndex: '73',
    },
    {
      name: 'Poliwag',
      types: ['water'],
      number: '060',
      pokedexIndex: '74',
    },
    {
      name: 'Poliwhirl',
      types: ['water'],
      number: '061',
      pokedexIndex: '75',
    },
    {
      name: 'Poliwrath',
      types: ['water', 'fighting'],
      number: '062',
      pokedexIndex: '76',
    },
    {
      name: 'Abra',
      types: ['psychic'],
      number: '063',
      pokedexIndex: '77',
    },
    {
      name: 'Kadabra',
      types: ['psychic'],
      number: '064',
      pokedexIndex: '78',
    },
    {
      name: 'Alakazam',
      types: ['psychic'],
      number: '065',
      pokedexIndex: '79',
    },
    {
      name: 'Mega Alakazam',
      types: ['psychic'],
      number: '065',
      pokedexIndex: '80',
    },
    {
      name: 'Machop',
      types: ['fighting'],
      number: '066',
      pokedexIndex: '81',
    },
    {
      name: 'Machoke',
      types: ['fighting'],
      number: '067',
      pokedexIndex: '82',
    },
    {
      name: 'Machamp',
      types: ['fighting'],
      number: '068',
      pokedexIndex: '83',
    },
    {
      name: 'Bellsprout',
      types: ['grass', 'poison'],
      number: '069',
      pokedexIndex: '84',
    },
    {
      name: 'Weepinbell',
      types: ['grass', 'poison'],
      number: '070',
      pokedexIndex: '85',
    },
    {
      name: 'Victreebel',
      types: ['grass', 'poison'],
      number: '071',
      pokedexIndex: '86',
    },
    {
      name: 'Tentacool',
      types: ['water', 'poison'],
      number: '072',
      pokedexIndex: '87',
    },
    {
      name: 'Tentacruel',
      types: ['water', 'poison'],
      number: '073',
      pokedexIndex: '88',
    },
    {
      name: 'Geodude',
      types: ['rock', 'ground'],
      number: '074',
      pokedexIndex: '89',
    },
    {
      name: 'Graveler',
      types: ['rock', 'ground'],
      number: '075',
      pokedexIndex: '90',
    },
    {
      name: 'Golem',
      types: ['rock', 'ground'],
      number: '076',
      pokedexIndex: '91',
    },
    {
      name: 'Ponyta',
      types: ['fire'],
      number: '077',
      pokedexIndex: '92',
    },
    {
      name: 'Rapidash',
      types: ['fire'],
      number: '078',
      pokedexIndex: '93',
    },
    {
      name: 'Slowpoke',
      types: ['water', 'psychic'],
      number: '079',
      pokedexIndex: '94',
    },
    {
      name: 'Slowbro',
      types: ['water', 'psychic'],
      number: '080',
      pokedexIndex: '95',
    },
    {
      name: 'Mega Slowbro',
      types: ['water', 'psychic'],
      number: '080',
      pokedexIndex: '96',
    },
    {
      name: 'Shellder',
      types: ['water'],
      number: '090',
      pokedexIndex: '106',
    },
    {
      name: 'Cloyster',
      types: ['water', 'ice'],
      number: '091',
      pokedexIndex: '107',
    },
    {
      name: 'Gastly',
      types: ['ghost', 'poison'],
      number: '092',
      pokedexIndex: '108',
    },
    {
      name: 'Haunter',
      types: ['ghost', 'poison'],
      number: '093',
      pokedexIndex: '109',
    },
    {
      name: 'Gengar',
      types: ['ghost', 'poison'],
      number: '094',
      pokedexIndex: '110',
    },
    {
      name: 'Mega Gengar',
      types: ['ghost', 'poison'],
      number: '094',
      pokedexIndex: '111',
    },
    {
      name: 'Onix',
      types: ['rock', 'ground'],
      number: '095',
      pokedexIndex: '112',
    },
    {
      name: 'Exeggcute',
      types: ['grass', 'psychic'],
      number: '102',
      pokedexIndex: '119',
    },
    {
      name: 'Exeggutor',
      types: ['grass', 'psychic'],
      number: '103',
      pokedexIndex: '120',
    },
    {
      name: 'Cubone',
      types: ['ground'],
      number: '104',
      pokedexIndex: '122',
    },
    {
      name: 'Marowak',
      types: ['ground'],
      number: '105',
      pokedexIndex: '123',
    },
    {
      name: 'Hitmonlee',
      types: ['fighting'],
      number: '106',
      pokedexIndex: '125',
    },
    {
      name: 'Hitmonchan',
      types: ['fighting'],
      number: '107',
      pokedexIndex: '126',
    },
    {
      name: 'Lickitung',
      types: ['normal'],
      number: '108',
      pokedexIndex: '127',
    },
    {
      name: 'Koffing',
      types: ['poison'],
      number: '109',
      pokedexIndex: '128',
    },
    {
      name: 'Weezing',
      types: ['poison'],
      number: '110',
      pokedexIndex: '129',
    },
    {
      name: 'Rhyhorn',
      types: ['ground', 'rock'],
      number: '111',
      pokedexIndex: '130',
    },
    {
      name: 'Rhydon',
      types: ['ground', 'rock'],
      number: '112',
      pokedexIndex: '131',
    },
    {
      name: 'Chansey',
      types: ['normal'],
      number: '113',
      pokedexIndex: '132',
    },
    {
      name: 'Tangela',
      types: ['grass'],
      number: '114',
      pokedexIndex: '133',
    },
    {
      name: 'Kangaskhan',
      types: ['normal'],
      number: '115',
      pokedexIndex: '134',
    },
    {
      name: 'Mega Kangaskhan',
      types: ['normal'],
      number: '115',
      pokedexIndex: '135',
    },
    {
      name: 'Horsea',
      types: ['water'],
      number: '116',
      pokedexIndex: '136',
    },
    {
      name: 'Staryu',
      types: ['water'],
      number: '120',
      pokedexIndex: '140',
    },
    {
      name: 'Starmie',
      types: ['water', 'psychic'],
      number: '121',
      pokedexIndex: '141',
    },
    {
      name: 'Mr. Mime',
      types: ['psychic', 'fairy'],
      number: '122',
      pokedexIndex: '142',
    },
    {
      name: 'Scyther',
      types: ['bug', 'flying'],
      number: '123',
      pokedexIndex: '143',
    },
    {
      name: 'Jynx',
      types: ['ice', 'psychic'],
      number: '124',
      pokedexIndex: '144',
    },
    {
      name: 'Electabuzz',
      types: ['electric'],
      number: '125',
      pokedexIndex: '145',
    },
    {
      name: 'Magmar',
      types: ['fire'],
      number: '126',
      pokedexIndex: '146',
    },
    {
      name: 'Pinsir',
      types: ['bug'],
      number: '127',
      pokedexIndex: '147',
    },
    {
      name: 'Mega Pinsir',
      types: ['bug', 'flying'],
      number: '127',
      pokedexIndex: '148',
    },
    {
      name: 'Tauros',
      types: ['normal'],
      number: '128',
      pokedexIndex: '149',
    },
    {
      name: 'Magikarp',
      types: ['water'],
      number: '129',
      pokedexIndex: '150',
    },
    {
      name: 'Gyarados',
      types: ['water', 'flying'],
      number: '130',
      pokedexIndex: '151',
    },
    {
      name: 'Mega Gyarados',
      types: ['water', 'dark'],
      number: '130',
      pokedexIndex: '152',
    },
    {
      name: 'Porygon',
      types: ['normal'],
      number: '137',
      pokedexIndex: '159',
    },
    {
      name: 'Omanyte',
      types: ['rock', 'water'],
      number: '138',
      pokedexIndex: '160',
    },
    {
      name: 'Omastar',
      types: ['rock', 'water'],
      number: '139',
      pokedexIndex: '161',
    },
    {
      name: 'Kabuto',
      types: ['rock', 'water'],
      number: '140',
      pokedexIndex: '162',
    },
    {
      name: 'Kabutops',
      types: ['rock', 'water'],
      number: '141',
      pokedexIndex: '163',
    },
    {
      name: 'Aerodactyl',
      types: ['rock', 'flying'],
      number: '142',
      pokedexIndex: '164',
    },
    {
      name: 'Mega Aerodactyl',
      types: ['rock', 'flying'],
      number: '142',
      pokedexIndex: '165',
    },
    {
      name: 'Snorlax',
      types: ['normal'],
      number: '143',
      pokedexIndex: '166',
    },
    {
      name: 'Articuno',
      types: ['ice', 'flying'],
      number: '144',
      pokedexIndex: '167',
    },
    {
      name: 'Zapdos',
      types: ['electric', 'flying'],
      number: '145',
      pokedexIndex: '168',
    },
    {
      name: 'Moltres',
      types: ['fire', 'flying'],
      number: '146',
      pokedexIndex: '169',
    },
    {
      name: 'Dratini',
      types: ['dragon'],
      number: '147',
      pokedexIndex: '170',
    },
    {
      name: 'Dragonair',
      types: ['dragon'],
      number: '148',
      pokedexIndex: '171',
    },
    {
      name: 'Dragonite',
      types: ['dragon', 'flying'],
      number: '149',
      pokedexIndex: '172',
    },
    {
      name: 'Mewtwo',
      types: ['psychic'],
      number: '150',
      pokedexIndex: '173',
    },
    {
      name: 'Mega Mewtwo Y',
      types: ['psychic'],
      number: '150',
      pokedexIndex: '175',
    },
    {
      name: 'Mega Mewtwo X',
      types: ['psychic', 'fighting'],
      number: '150',
      pokedexIndex: '174',
    },
    {
      name: 'Mew',
      types: ['psychic'],
      number: '151',
      pokedexIndex: '176',
    },
  ],
};

// Return the name to find the pokemon image.
export function resolveSrcName(name) {
  if (name.indexOf('Mega') > -1) {
    name = name.split(' ').slice(1);
    name[0] = name[0] + '-Mega';
    return name.join('_');
  }

  if (name.indexOf(' male') > -1 || name.indexOf(' female') > -1) {
    return name.split(' ')[0];
  }

  if (name === "Farfetch'd") {
    return 'Farfetch_27d';
  }

  if (name.indexOf(' ') > -1) {
    return name.replace(' ', '_');
  }

  return name;
}
