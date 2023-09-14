import { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="nameId" className="formLabel">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            id="nameId"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Jacob Mercer"
          />
          <div />
          <label htmlFor="numberId" className="formLabel">
            Number
          </label>
          <input
            className="form-input"
            type="tel"
            name="number"
            id="numberId"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            value={this.state.number}
            placeholder="111-22-33"
          />
          <div>
            <button type="submit" className="btn btn-primary">
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
