const ContactList = ({ userContacts, handleDelete }) => {
  return (
    <ul>
      {userContacts.map(({ id, name, number }) => (
        <li key={id} className="contactItem">
          {name}: {number}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleDelete(id)}
          >
            {' '}
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
