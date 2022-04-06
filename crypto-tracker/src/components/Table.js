import styled from 'styled-components';
import Row from './Row';


const StyledTable = styled.div`
    margin: 1em 0;

    hr{
        border: none;
        height: 1px;
        background: ${props => props.theme.colors.lightGray};
    }
`;

const StyledTableTitle = styled.div`
    display: flex;
    justify-content: space-between;

    span{
        font-weight: bold;
    }
`;

const Table = ({rows}) => {
    return ( 
        <StyledTable>
            <StyledTableTitle>
                <span>Name</span>
                <span>Market Cap</span>
                <span>Price</span>
            </StyledTableTitle>
            <hr />

            {rows.map((coin, index) => (
                <Row key={index} coin={coin} />
            ))}
            
        </StyledTable>
    );
}

export default Table;