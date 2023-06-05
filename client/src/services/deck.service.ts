import { baseURl } from '../utils/constants';

import userService from './user.service';

import { CreateDeck, Deck } from '../types';

function config() {
  return {
    Authorization: `Bearer ${userService.getToken()}`,
    'Content-Type': 'application/json',
  };
}

async function getAllUserDecks() {
  const res = await fetch(`${baseURl}/deck/mydecks`, {
    method: 'GET',
    headers: config(),
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

async function getAllSharedDecks() {
  const res = await fetch(`${baseURl}/deck`, {
    method: 'GET',
    headers: config(),
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

async function getSingleDeck(id: string) {
  const res = await fetch(`${baseURl}/deck/${id}`, {
    method: 'GET',
    headers: config(),
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

async function createUserDeck(deck: CreateDeck) {
  const res = await fetch(`${baseURl}/deck`, {
    method: 'POST',
    headers: config(),
    body: JSON.stringify(deck),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

async function deleteUserDeck(id: string) {
  const res = await fetch(`${baseURl}/deck/${id}`, {
    method: 'DELETE',
    headers: config(),
  });
  if (res.status !== 204) {
    const data = await res.json();
    throw new Error(data.error);
  }
  return res;
}

async function updateDeckLikes(id: string) {
  const res = await fetch(`${baseURl}/deck/${id}/likes`, {
    method: 'PATCH',
    headers: config(),
  });
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data;
}

async function updateUserDeck(updatedDeck: Deck) {
  const updatedDeckObj = { updatedDeck };
  const res = await fetch(`${baseURl}/deck/${updatedDeck.id}`, {
    method: 'PUT',
    headers: config(),
    body: JSON.stringify(updatedDeckObj),
  });

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }

  return data;
}

export default {
  getAllUserDecks,
  getAllSharedDecks,
  getSingleDeck,
  createUserDeck,
  deleteUserDeck,
  updateDeckLikes,
  updateUserDeck,
};
