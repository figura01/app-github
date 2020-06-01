import React from 'react';
import { Grid, Image, Card, Button, Icon, Table } from 'semantic-ui-react';
import './result-item.scss';

const ResultItem = ({
    repoName,
    ownerName,
    description,
    pictureURL,
    id,
    showDetail,
    isSelected,
    nbrDir,
    nbrFile,
    htmlURL,
}) => {
    const handlerClick = () => {
        console.log('click')
        console.log(id);
        showDetail(id);
    };
    return (
        <>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Card style={{width: '100%'}} className="result-item">
                    <Image src={pictureURL} className="result-item-visu" />
                    <h2>{repoName}</h2>
                    <h3>Auteur:  {ownerName}</h3>
                    <p>{description}</p>

                    {isSelected && (
                        <Card.Content extra>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">Git Repository</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="folder" /> Répertoire(s)
                </Table.Cell>
                <Table.Cell>{nbrDir}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="file outline" /> Fichier(s)
                </Table.Cell>
                <Table.Cell>{nbrFile}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
        )}

                    <Card.Content extra>
                        { htmlURL && (
                            <a href={htmlURL} className="ui button" target="blank">
                                <Icon name="eye" />
                                Voir
                            </a> 
                        )}
                       

                        <Button
                            onClick={handlerClick}
                        >
                            <Icon name="eye" />
                            Détail
                        </Button>
                    </Card.Content>
                </Card>
            </Grid.Column>
        </>
    );
}

export default ResultItem;