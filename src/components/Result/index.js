import React from 'react';
import { Grid,  Container} from 'semantic-ui-react'
import ResultItem from './ResultItem';
const Result = ({list, showDetail }) => {
    //console.log(list)

    console.log(list);
    return (
    <div id="result">
        <Container>
            <Grid>
                {list.map((item) => {
                    return (
                        <ResultItem 
                            key={item.id} 
                            showDetail={showDetail}
                            {...item}     
                        />
                    );
                })}

            </Grid>
        </Container>
    </div>
);
}

export default Result;