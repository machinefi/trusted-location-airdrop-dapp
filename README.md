# Build a dApp based on trusted location with IoTeX

This app uses the IoTeX Geo Location API and verifier contracts suite to allow users to create Airdrop based on trusted location. These Airdrops can be claimed only by those users who can prove their position within the specified area, within a certain time frame.  

## Pre-requisites

For users to prove their location they would have to use IoTeX native wallet, [ioPay](https://iopay.me/) and enable the [W3bstream](https://w3bstream.com/) geo-location module. A full tutorial on how to do this can be found in the IoTeX Developer Portal, [here](https://developers.iotex.io/posts/enable-trusted-geolocation-tutorial).

## Getting Started

Fork and clone this repository, at this point you'll find two directories: ***frontend*** and ***web3***.

### /web3

1. Use `npm install` to install all blockchain dependencies
2. Create a new .env file and add your private key: e.g. `IOTEX_PRIVATE_KEY = <YOUR-PRIVATE-KEY>`
3. Compile the contracts by running: `npm run compile`
4. Test the contracts by runnning: `npm run test`
5. Use this command to deploy to IoTeX Testnet: `npm run deploy:testnet`

### /frontend

1. Use `npm install` to install all frontend dependencies
2. Run `npm run dev` and open your browser at http://localhost:3000/