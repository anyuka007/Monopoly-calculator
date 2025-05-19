export type PropertyCard = {
    name: { classic: string; wunderland: string };
    color: string;
    price: number;
    rent: number[];
    houseCost: number;
    mortgageValue: number;
  };
  
  export type RailroadCard = {
    name: { classic: string; wunderland: string };
    price: number;
    rent: number[];
    mortgageValue: number;
  };
  
  export type UtilityCard = {
    name: string;
    price: number;
    mortgageValue: number;
  };

  
  export const propertyCards: PropertyCard[] = [
    {
      name: {classic: "Mediterranean Avenue", wunderland: "Wüste Death Valley Amerika"},
      color: "brown",
      price: 60,
      rent: [2, 10, 30, 90, 160, 250],
      houseCost: 50,
      mortgageValue: 30,
    },
    {
      name: {classic: "Baltic Avenue", wunderland: "Eismeer Finland" },
      color: "brown",
      price: 60,
      rent: [4, 20, 60, 180, 320, 450],
      houseCost: 50,
      mortgageValue: 30,
    },
    {
      name: {classic: "Oriental Avenue", wunderland: "Bahnbetriebswerk Hamburg"},
      color: "sky",
      price: 100,
      rent: [6, 30, 90, 270, 400, 550],
      houseCost: 50,
      mortgageValue: 50,
    },
    {
      name: {classic: "Vermont Avenue", wunderland: "Knuffingen Airport"},
      color: "sky",
      price: 100,
      rent: [6, 30, 90, 270, 400, 550],
      houseCost: 50,
      mortgageValue: 50,
    },
    {
    name: {classic: "Connecticut Avenue", wunderland: "Schokoladenfabrik Schweiz"},
      color: "sky",
      price: 120,
      rent: [8, 40, 100, 300, 450, 600],
      houseCost: 50,
      mortgageValue: 60,
    },
    {
      name: {classic: "St. Charles Place", wunderland: "Hermannsdenkmal Mitteldeutschland"},
      color: "pink",
      price: 140,
      rent: [10, 50, 150, 450, 625, 750],
      houseCost: 100,
      mortgageValue: 70,
    },
    {
      name: {classic: "States Avenue", wunderland: "Mount Rushmore Amerika"},
      color: "pink",
      price: 140,
      rent: [10, 50, 150, 450, 625, 750],
      houseCost: 100,
      mortgageValue: 70,
    },
    {
      name: {classic: "Virginia Avenue", wunderland: "Kolosseum Italien"},
      color: "pink",
      price: 160,
      rent: [12, 60, 180, 500, 700, 900],
      houseCost: 100,
      mortgageValue: 80,
    },
    {
      name: {classic: "St. James Place", wunderland: "Kirmes Mitteldeutschland"},
      color: "orange",
      price: 180,
      rent: [14, 70, 200, 550, 750, 950],
      houseCost: 100,
      mortgageValue: 90,
    },
    {
      name: {classic: "Tennessee Avenue", wunderland: "Zirkus Dänemark"},
      color: "orange",
      price: 180,
      rent: [14, 70, 200, 550, 750, 950],
      houseCost: 100,
      mortgageValue: 90,
    },
    {
      name: {classic: "New York Avenue", wunderland: "DJ Bobo Konzert Schweiz"},
      color: "orange",
      price: 200,
      rent: [16, 80, 220, 600, 800, 1000],
      houseCost: 100,
      mortgageValue: 100,
    },
    {
      name: {classic: "Kentucky Avenue", wunderland: "Grand Canyon Amerika"},
      color: "red",
      price: 220,
      rent: [18, 90, 250, 700, 875, 1050],
      houseCost: 150,
      mortgageValue: 110,
    },
    {
      name: {classic: "Indiana Avenue", wunderland: "Matterhorn Schweiz"},
      color: "red",
      price: 220,
      rent: [18, 90, 250, 700, 875, 1050],
      houseCost: 150,
      mortgageValue: 110,
    },
    {
      name: {classic: "Illinois Avenue", wunderland: "Vesuv Italien"},
      color: "red",
      price: 240,
      rent: [20, 100, 300, 750, 925, 1100],
      houseCost: 150,
      mortgageValue: 120,
    },
    {
      name: {classic: "Atlantic Avenue", wunderland: "Michel Hamburg"},
      color: "yellow",
      price: 260,
      rent: [22, 110, 330, 800, 975, 1150],
      houseCost: 150,
      mortgageValue: 130,
    },
    {
      name: {classic: "Ventnor Avenue", wunderland: "Schloss Löwenstein Knuffingen"},
      color: "yellow",
      price: 260,
      rent: [22, 110, 330, 800, 975, 1150],
      houseCost: 150,
      mortgageValue: 130,
    },
    {
      name: {classic: "Marvin Gardens", wunderland: "Petersdom Italien"},
      color: "yellow",
      price: 280,
      rent: [24, 120, 360, 850, 1025, 1200],
      houseCost: 150,
      mortgageValue: 140,
    },
    {
      name: {classic: "Pacific Avenue", wunderland: "St. Max Schweiz"},
      color: "green",
      price: 300,
      rent: [26, 130, 390, 900, 1100, 1275],
      houseCost: 200,
      mortgageValue: 150,
    },
    {
      name: {classic: "North Carolina Avenue", wunderland: "Insel Capri Italien"},
      color: "green",
      price: 300,
      rent: [26, 130, 390, 900, 1100, 1275],
      houseCost: 200,
      mortgageValue: 150,
    },
    {
      name: {classic: "Pennsylvania Avenue", wunderland: "Las Vegas Amerika"},
      color: "green",
      price: 320,
      rent: [28, 150, 450, 1000, 1200, 1400],
      houseCost: 200,
      mortgageValue: 160,
    },
    {
      name: {classic: "Park Place", wunderland: "Schloss Neuschwanstein Bayern"},
      color: "indigo",
      price: 350,
      rent: [35, 175, 500, 1100, 1300, 1500],
      houseCost: 200,
      mortgageValue: 175,
    },
    {
      name: {classic: "Boardwalk", wunderland: "Elbphilharmonie Hamburg"},
      color: "indigo",
      price: 400,
      rent: [50, 200, 600, 1400, 1700, 2000],
      houseCost: 200,
      mortgageValue: 200,
    },
  ];


  export const railroadCards: RailroadCard[] = [
    {
      name: {classic: "Reading Railroad", wunderland: "Bahnhof Knuffingen"},
      price: 200,
      rent: [25, 50, 100, 200], // Rent increases with the number of railroads owned
      mortgageValue: 100,
    },
    {
      name: {classic: "Pennsylvania Railroad", wunderland: "Bahnhof Dammtor Hamburg"},
      price: 200,
      rent: [25, 50, 100, 200],
      mortgageValue: 100,
    },
    {
      name: {classic: "B&O Railroad", wunderland: "Bahnhof Termini Rom"},
      price: 200,
      rent: [25, 50, 100, 200],
      mortgageValue: 100,
    },
    {
      name: {classic: "Short Line", wunderland: "Bahnhof Porta Alpina"},
      price: 200,
      rent: [25, 50, 100, 200],
      mortgageValue: 100,
    },
  ]


  export const utilities: UtilityCard[] = [
    {
      name: "Electric Company",
      price: 150,
      mortgageValue: 75,
    },
    {
      name: "Water Works",
      price: 150,
      mortgageValue: 75,
    },
  ];