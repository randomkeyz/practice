import styled from 'styled-components';
import TableTitle from './TableTitle';
import Row from './Row';

const StyledTable = styled.div`
    margin: 1em 0;

    hr{
        border: none;
        height: 1px;
        background: #D4D4D4;
    }
`;

const Table = ({top10}) => {
    return ( 
        <StyledTable>
            <TableTitle />
            <hr />
            {top10.map((coin, index) => (
                <Row key={index} coin={coin} />
            ))}
            
        </StyledTable>
    );
}

export default Table;