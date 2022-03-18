import styled from 'styled-components';

const StyledTableTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TableTitle = () => {
    return (
        <StyledTableTitle>
            <span>Name</span>
            <span>Market Cap</span>
            <span>Price</span>
        </StyledTableTitle>
    );
}

export default TableTitle;