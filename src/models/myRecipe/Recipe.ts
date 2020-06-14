//  "id": 42,
//                 "name": "cajunkruiden",
//                 "videoId": "k3XBxSP0-EY",
//                 "description": "recept voor cajunkruiden",
//                 "private": false,
//                 "ingredients": null,
//                 "links": null,
//                 "amount": "1- handjevol",
//                 "favorite": false

export type Recipe = {
  id: number;
  name: string;
  videoId: string;
  description: string;
  private: boolean;
  ingredients: null;
  links: null;
  amount: string;
  favorite: boolean;
}