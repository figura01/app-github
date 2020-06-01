import React from 'react';
import Navbar from './../Navbar';
import SearchBar from './../SearchBar';
import Result from './../Result';
import CompLoader from './../CompLoader';
import axios from 'axios';

import './github-app.scss';

class GithubApp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            results: null,
            dataIsLoaded: true,
            errorMessage: null,
            searchText: '',
        }
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData = () => {
        axios.get('https://api.github.com/search/repositories?q=react&sort=stars&order=desc&per_page=10')
        .then((response) => {
            console.log(response);

            const treatElement = (elt) => ({
                id: elt.id,
                repoName: elt.name,
                ownerName: elt.owner.login,
                pictureURL: elt.owner.avatar_url,
                description: elt.description || '',
                url: elt.url,
                htmlURL: elt.html_url,
                isSelected: false,
            });

            const results = response.data.items.map(treatElement);

            this.setState({
                results,
                dataIsLoaded: false,
            })
        })
        .catch((err) => console.log(err));
    }

    updateSearchValue = (newValue) => {
        this.setState({
            searchText: newValue,
        })
    }

    handleToShowDetail = (idRepo) => {
        /*url: "https://api.github.com/repos/suzeyu1992/contents"*/
        // eslint-disable-next-line no-console
        console.log('show detail');
        // eslint-disable-next-line no-console
        console.log(idRepo);
    
        const { results } = this.state;
    
        const currentRepo = results.find(repo => repo.id === idRepo);
        console.log(`${currentRepo.url}/contents`);
    
        axios.get(`${currentRepo.url}/contents`)
            .then((response) => {
            // eslint-disable-next-line no-console
            //console.log('response', response.data);

            const nbrDir = response.data.filter((depo) => depo.type === 'dir').length;
            const nbrFile = response.data.filter((depo) => depo.type === 'file').length;
            const indexOfRepo = results.findIndex((elt) => elt.id === idRepo);

            console.log(nbrDir);
            console.log(nbrFile);
            console.log(indexOfRepo);
            
            const newResults = results.map((rep) => rep);
            console.log('first', newResults);
            newResults[indexOfRepo].nbrDir = nbrDir;
            newResults[indexOfRepo].nbrFile = nbrFile;
            newResults[indexOfRepo].isSelected = !newResults[indexOfRepo].isSelected;

            console.log('2nd', newResults);
            this.setState({
            results: newResults,
            });

            //const results = currentRepo.map(treatElement);
            // eslint-disable-next-line no-console
            // console.log(results);
            }).catch((error) => {
            this.setState({
                errorMessage: error.message,
                // s'il y a une erreur, ne pas afficher les résultats de la requête d'avant
                results: null,
            });
            }).finally(() => {
            // on masque le loader
            this.setState({
                loading: false,
            });
        });
    }

    handleSubmit = () => {
        const { searchText } = this.state;
        this.setState({
          errorMessage: null,
          loading: true,
        });

        axios.get(`https://api.github.com/search/repositories?q=${searchText}`)
        .then((response) => {
        // eslint-disable-next-line no-console
            console.log('response', response.data.items);

            // const elt = response.data.items[0];
            // console.log(elt);

            const treatElement = (elt) => ({
            id: elt.id,
            repoName: elt.name,
            ownerName: elt.owner.login,
            pictureURL: elt.owner.avatar_url,
            description: elt.description || '',
            url: elt.url,
            isSelected: false,
            });

            const results = response.data.items.map(treatElement);
                // eslint-disable-next-line no-console
                console.log(results);
                this.setState({
                results,
                });
            }).catch((error) => {
                // handle error
                this.setState({
                errorMessage: error.message,
                // s'il y a une erreur, ne pas afficher les résultats de la requête d'avant
                results: null,
                });
            }).finally(() => {
                // on masque le loader
                this.setState({
                loading: false,
            });
        });
    }
 
    render() {
        const { dataIsLoaded, results, searchText } = this.state;
        return (
            <div id="githubapp">
                <Navbar />
                <SearchBar 
                    value={searchText}
                    onChangeValue={this.updateSearchValue}
                    onSubmitForm={this.handleSubmit}
                />
                { results && (
                    <Result list={results} showDetail={this.handleToShowDetail}/>
                )}
                
                { dataIsLoaded && (
                    <CompLoader />
                )}
            </div>
        )
    }
}

export default GithubApp;