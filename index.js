#!/usr/bin/env node

const readline = require('readline');


console.log("MY POKEMON GAME");

async function moves() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Use await with rl.question to get user input
  const pokeName = await new Promise((resolve) => {
    rl.question('Please enter your Pokemon character to view moves: ', (answer) => {
      resolve(answer);
    });
  });

  rl.close(); // Close the readline interface

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  
  if (res.status === 404) {
    console.log('Pokemon not found.');
  } else {
    const data = await res.json();
    const moves = data.moves.map(({ move }) => {
      return move.name;
    });
    console.log(moves.slice(0, 5));
  }
}

moves();
