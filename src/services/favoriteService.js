export default {
    isFavorite
}

function isFavorite(favorites, id) {
  return favorites.some(favorite => favorite.id === id);
};