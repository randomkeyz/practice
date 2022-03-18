import styled from 'styled-components';

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    span{
        width: 100%;
    }
`;

const Row = ({coin}) => {
    return ( 
        <StyledRow>
            <div>
                {/*<img src={} alt={}/>*/}
                <span>{coin.name}</span>
                <span>{coin.symbol}</span>
            </div>
            <div>$837.76B</div>
            <div>
                <span>$44,163.76</span>
                <span>+2.95%</span>
            </div>
        </StyledRow>
    );
}

export default Row;