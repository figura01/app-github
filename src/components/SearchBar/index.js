import React from 'react';
import { Input, Form, Button, Card, Container  } from 'semantic-ui-react'
import './search-bar.scss';

const SearchBar = ({onChangeValue, value, onSubmitForm}) => {

    const handleChange = (event) => {
        console.log('change', event.target.value);
        onChangeValue(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitForm();
;    }
    return (
        <div id="search-bar">
            <Container>
                <h2 className="title">Recherchez des dépots github</h2>
                <Card width='auto' style={{width: 'auto', padding: '1em'}}>
                    <Form 
                        className="searchbar-form"
                        onSubmit={(e) => {handleSubmit(e)}}
                    >
                        <Input
                            icon={{ name: 'search', circular: true, link: true }}
                            className="searchbar-input"
                            placeholder="Search..."
                            type="search"
                            onChange={(e) => {handleChange(e)}}
                            value={value}
                        />
                        <Button className="searchbar-button" type='submit'>Rechercher</Button>
                    </Form>
                </Card>
            </Container>
        </div>
);
}

export default SearchBar;