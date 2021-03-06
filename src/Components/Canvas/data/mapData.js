//Use the map builder to create new road layouts.
//1 represents a road
const rawData = `0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	D	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	1	1	1	1	1	1	1	1	1	R	1	L	1	1	1	1	1	1	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	1	0	0	0	0	0	0	0	0	0	1	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	1	0	0	0	0	0	0	0	0	0	1	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	D	0	0	0	0	0	0	0	0	0	D	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	1	1	1	R	1	L	1	1	1	1	1	1	1	R	1	L	1	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	U	0	0	0	0	U	0	0	0	0	U	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0	0	1	0	0	0	0	1	0
0	1	0	0	0	D	0	0	0	0	D	0	0	0	0	D	0	0	0	0	D	0	0	1	0	0	0	0	1	0
0	1	1	1	R	1	L	1	1	R	1	L	1	1	R	1	L	1	1	R	1	L	R	1	L	1	1	1	1	0
0	1	0	0	0	U	0	0	0	0	U	0	0	0	0	U	0	0	0	0	U	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0	0	1	0	0	0	0	1	0
0	1	0	0	0	D	0	0	0	0	D	0	0	0	0	1	0	0	0	0	1	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	L	1	1	R	1	L	1	1	1	1	1	1	1	1	1	1	R	1	0	0	0	0	1	0
0	1	0	0	0	U	0	0	0	0	0	0	0	U	0	0	0	0	U	0	0	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	0	0	0	0	0	0	0	D	0	0	0	0	D	0	0	0	0	1	0	0	0	0	1	0
0	1	0	0	0	1	1	1	1	1	1	1	R	1	L	1	1	1	1	1	1	1	1	1	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	U	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	0	0	0	0	1	0
0	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	1	0
0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0`;

export const mapData = rawData
  .split("\n")
  .map((row) => row.split(/\s/).map((tile) => (tile === "0" ? 0 : tile)));
