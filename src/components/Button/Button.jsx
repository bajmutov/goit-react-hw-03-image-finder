export const Button = ({ loadmore, showButton }) => {
  return (
    <button
      type="button"
      className="btn"
      onClick={loadmore}
      disabled={showButton}
    >
      Load more
    </button>
  );
};
