import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import initialContacts from './initialContacts.json';

const KEY_CONTACTS = 'contacts';

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

componentDidMount(){
const localData = JSON.parse(localStorage.getItem(KEY_CONTACTS))
if(localData.length) this.setState({contacts: localData})
}

componentDidUpdate(_,prevState){
if(prevState.contacts.length !== this.state.contacts.length){
  localStorage.setItem(KEY_CONTACTS, JSON.stringify(this.state.contacts))
}
}

  addContact = data => {
    const isAlreadyExist = this.state.contacts.find(
      el => el.name === data.name
    );
    if (isAlreadyExist) return alert(`${data.name} is already in contacts`);

    console.log('data', this.state);
    const newUser = {
      id: nanoid(),
      ...data,
    };
    this.setState(({ contacts }) => ({
      contacts: [newUser, ...contacts],
    }));
  };

  changeFilter = e => {
    console.log('this.state', this.state);
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter changeFilter={this.changeFilter} value={this.state.filter} />
        <ContactList
          userContacts={this.getVisibleContact()}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
