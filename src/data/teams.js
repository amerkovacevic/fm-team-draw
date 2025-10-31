export const teamDatabase = [
  {
    country: 'England',
    flag: '🏴',
    leagues: [
      {
        name: 'Premier League',
        level: 'Top Flight',
        teams: [
          'Arsenal',
          'Aston Villa',
          'Chelsea',
          'Liverpool',
          'Manchester City',
          'Manchester United',
          'Newcastle United',
          'Tottenham Hotspur',
          'West Ham United',
          'Wolverhampton Wanderers',
        ],
      },
      {
        name: 'EFL Championship',
        level: 'Second Division',
        teams: [
          'Leeds United',
          'Leicester City',
          'Southampton',
          'Ipswich Town',
          'Norwich City',
          'Middlesbrough',
          'Sunderland',
          'West Bromwich Albion',
        ],
      },
    ],
  },
  {
    country: 'Spain',
    flag: '🇪🇸',
    leagues: [
      {
        name: 'LaLiga',
        level: 'Top Flight',
        teams: [
          'Atlético Madrid',
          'Barcelona',
          'Girona',
          'Real Betis',
          'Real Madrid',
          'Real Sociedad',
          'Sevilla',
          'Valencia',
          'Villarreal',
        ],
      },
      {
        name: 'LaLiga Hypermotion',
        level: 'Second Division',
        teams: [
          'Albacete',
          'Burgos',
          'Eibar',
          'Elche',
          'Espanyol',
          'Leganés',
          'Oviedo',
          'Real Zaragoza',
        ],
      },
    ],
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    leagues: [
      {
        name: 'Bundesliga',
        level: 'Top Flight',
        teams: [
          'Bayer Leverkusen',
          'Bayern Munich',
          'Borussia Dortmund',
          'Borussia Mönchengladbach',
          'Eintracht Frankfurt',
          'RB Leipzig',
          'SC Freiburg',
          'TSG Hoffenheim',
          'VfB Stuttgart',
          'Werder Bremen',
        ],
      },
      {
        name: '2. Bundesliga',
        level: 'Second Division',
        teams: [
          '1. FC Köln',
          'Fortuna Düsseldorf',
          'Hamburger SV',
          'Hannover 96',
          'Hertha BSC',
          'Kaiserslautern',
          'Nürnberg',
          'Schalke 04',
        ],
      },
    ],
  },
  {
    country: 'Italy',
    flag: '🇮🇹',
    leagues: [
      {
        name: 'Serie A',
        level: 'Top Flight',
        teams: [
          'AC Milan',
          'AS Roma',
          'Atalanta',
          'Fiorentina',
          'Inter Milan',
          'Juventus',
          'Lazio',
          'Napoli',
          'Torino',
          'Udinese',
        ],
      },
      {
        name: 'Serie B',
        level: 'Second Division',
        teams: [
          'Bari',
          'Cagliari',
          'Genoa',
          'Palermo',
          'Parma',
          'Pisa',
          'Reggina',
          'Sampdoria',
        ],
      },
    ],
  },
  {
    country: 'France',
    flag: '🇫🇷',
    leagues: [
      {
        name: 'Ligue 1',
        level: 'Top Flight',
        teams: [
          'AS Monaco',
          'Lille',
          'Lorient',
          'Lyon',
          'Marseille',
          'Nice',
          'Paris Saint-Germain',
          'Rennes',
          'RC Lens',
          'Toulouse',
        ],
      },
      {
        name: 'Ligue 2',
        level: 'Second Division',
        teams: [
          'AJ Auxerre',
          'Angers SCO',
          'Bastia',
          'Bordeaux',
          'Caen',
          'Grenoble',
          'Paris FC',
          'Saint-Étienne',
        ],
      },
    ],
  },
];

export const getLeaguesByCountry = (country) => {
  const countryEntry = teamDatabase.find((entry) => entry.country === country);
  return countryEntry ? countryEntry.leagues : [];
};

export const getTeamsByLeague = (country, league) => {
  const leagues = getLeaguesByCountry(country);
  const leagueEntry = leagues.find((item) => item.name === league);
  return leagueEntry ? leagueEntry.teams : [];
};

export const flattenTeams = () =>
  teamDatabase.flatMap((country) =>
    country.leagues.flatMap((league) =>
      league.teams.map((team) => ({
        country: country.country,
        countryFlag: country.flag,
        league: league.name,
        level: league.level,
        name: team,
      }))
    )
  );
