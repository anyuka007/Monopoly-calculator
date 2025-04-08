export type PropertyCard = {
    name: string;
    color: string;
    price: number;
    rent: number[];
    houseCost: number;
    mortgageValue: number;
  };
  
  export type RailroadCard = {
    name: string;
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
      name: "Mediterranean Avenue",
      color: "Brown",
      price: 60,
      rent: [2, 10, 30, 90, 160, 250],
      houseCost: 50,
      mortgageValue: 30,
    },
    {
      name: "Baltic Avenue",
      color: "Brown",
      price: 60,
      rent: [4, 20, 60, 180, 320, 450],
      houseCost: 50,
      mortgageValue: 30,
    },
    {
      name: "Oriental Avenue",
      color: "Light Blue",
      price: 100,
      rent: [6, 30, 90, 270, 400, 550],
      houseCost: 50,
      mortgageValue: 50,
    },
    {
      name: "Vermont Avenue",
      color: "Light Blue",
      price: 100,
      rent: [6, 30, 90, 270, 400, 550],
      houseCost: 50,
      mortgageValue: 50,
    },
    {
      name: "Connecticut Avenue",
      color: "Light Blue",
      price: 120,
      rent: [8, 40, 100, 300, 450, 600],
      houseCost: 50,
      mortgageValue: 60,
    },
    {
      name: "St. Charles Place",
      color: "Pink",
      price: 140,
      rent: [10, 50, 150, 450, 625, 750],
      houseCost: 100,
      mortgageValue: 70,
    },
    {
      name: "States Avenue",
      color: "Pink",
      price: 140,
      rent: [10, 50, 150, 450, 625, 750],
      houseCost: 100,
      mortgageValue: 70,
    },
    {
      name: "Virginia Avenue",
      color: "Pink",
      price: 160,
      rent: [12, 60, 180, 500, 700, 900],
      houseCost: 100,
      mortgageValue: 80,
    },
    {
      name: "St. James Place",
      color: "Orange",
      price: 180,
      rent: [14, 70, 200, 550, 750, 950],
      houseCost: 100,
      mortgageValue: 90,
    },
    {
      name: "Tennessee Avenue",
      color: "Orange",
      price: 180,
      rent: [14, 70, 200, 550, 750, 950],
      houseCost: 100,
      mortgageValue: 90,
    },
    {
      name: "New York Avenue",
      color: "Orange",
      price: 200,
      rent: [16, 80, 220, 600, 800, 1000],
      houseCost: 100,
      mortgageValue: 100,
    },
    {
      name: "Kentucky Avenue",
      color: "Red",
      price: 220,
      rent: [18, 90, 250, 700, 875, 1050],
      houseCost: 150,
      mortgageValue: 110,
    },
    {
      name: "Indiana Avenue",
      color: "Red",
      price: 220,
      rent: [18, 90, 250, 700, 875, 1050],
      houseCost: 150,
      mortgageValue: 110,
    },
    {
      name: "Illinois Avenue",
      color: "Red",
      price: 240,
      rent: [20, 100, 300, 750, 925, 1100],
      houseCost: 150,
      mortgageValue: 120,
    },
    {
      name: "Atlantic Avenue",
      color: "Yellow",
      price: 260,
      rent: [22, 110, 330, 800, 975, 1150],
      houseCost: 150,
      mortgageValue: 130,
    },
    {
      name: "Ventnor Avenue",
      color: "Yellow",
      price: 260,
      rent: [22, 110, 330, 800, 975, 1150],
      houseCost: 150,
      mortgageValue: 130,
    },
    {
      name: "Marvin Gardens",
      color: "Yellow",
      price: 280,
      rent: [24, 120, 360, 850, 1025, 1200],
      houseCost: 150,
      mortgageValue: 140,
    },
    {
      name: "Pacific Avenue",
      color: "Green",
      price: 300,
      rent: [26, 130, 390, 900, 1100, 1275],
      houseCost: 200,
      mortgageValue: 150,
    },
    {
      name: "North Carolina Avenue",
      color: "Green",
      price: 300,
      rent: [26, 130, 390, 900, 1100, 1275],
      houseCost: 200,
      mortgageValue: 150,
    },
    {
      name: "Pennsylvania Avenue",
      color: "Green",
      price: 320,
      rent: [28, 150, 450, 1000, 1200, 1400],
      houseCost: 200,
      mortgageValue: 160,
    },
    {
      name: "Park Place",
      color: "Dark Blue",
      price: 350,
      rent: [35, 175, 500, 1100, 1300, 1500],
      houseCost: 200,
      mortgageValue: 175,
    },
    {
      name: "Boardwalk",
      color: "Dark Blue",
      price: 400,
      rent: [50, 200, 600, 1400, 1700, 2000],
      houseCost: 200,
      mortgageValue: 200,
    },
  ];


  export const railroadsAndUtilities: RailroadCard[] = [
    {
      name: "Reading Railroad",
      price: 200,
      rent: [25, 50, 100, 200], // Rent increases with the number of railroads owned
      mortgageValue: 100,
    },
    {
      name: "Pennsylvania Railroad",
      price: 200,
      rent: [25, 50, 100, 200],
      mortgageValue: 100,
    },
    {
      name: "B&O Railroad",
      price: 200,
      rent: [25, 50, 100, 200],
      mortgageValue: 100,
    },
    {
      name: "Short Line",
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