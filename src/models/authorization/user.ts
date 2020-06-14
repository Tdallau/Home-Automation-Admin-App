// {
//   "tokenSettings": {
//       "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdkODJkNDQ0LTBjZjMtNDdiYS04YmIxLWJjYzcxNzVjNjQ4MSIsIm5iZiI6IjE1OTIxMzkxNzAiLCJleHAiOiIxNTkyMjI1NTcwIn0.HOd8K-Qe3K7L_v4EJ_lhEmYWse7erinPpKUIgqnKYYE",
//       "refreshToken": "5EerMb+hUNJGAW9K2A/u+FMK+6ga6x/yHIK29hzGhQk=",
//       "nbf": 1592139170,
//       "exp": 1592225570
//   },
//   "id": "7d82d444-0cf3-47ba-8bb1-bcc7175c6481",
//   "defaultAppId": "617cc8ea-ad52-11ea-a64d-0242ac130004",
//   "defaultAppName": "Mijn Recepten",
//   "email": "Tim@dallau.com"
// }

export type TokenSettings = {
  jwtToken: string;
  refreshToken: string;
  nbf: number;
  exp: number;
}

type User = {
  tokenSettings: TokenSettings;
  id: string;
  defaultAppId: string;
  defaultAppName: string;
  email: string;
}

export default User;