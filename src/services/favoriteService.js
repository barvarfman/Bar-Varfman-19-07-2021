export default {
    isFavorite
}

// Check if included in favorite.
function isFavorite(favorites, id) {
  return favorites.some(favorite => favorite.id === id);
};