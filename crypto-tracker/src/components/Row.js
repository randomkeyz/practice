import styled from 'styled-components';
import millify from 'millify';

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
    padding: 0.5em 0;
    img{
        max-width: 1.5em;
    }
`;

const StyledPrice = styled.div`
    text-align: center;
`;

const StyledPriceChange = styled.div`
    text-align: center;
    font-size: 0.875em;
`;

const StyledCoinInfo = styled.div`
    display:flex;
    width: 8.2em;
`;
const StyledNameInfo = styled.div`
    margin-left: 0.5em;
`;

const Row = ({ coin }) => {
    return ( 
        <StyledRow>
            <StyledCoinInfo>
                <img src={coin.logo_url} alt={coin.name + ' Logo'} />
                <StyledNameInfo>
                    <b>{coin.name}</b><br />
                    {coin.symbol}
                </StyledNameInfo>
            </StyledCoinInfo>
            <StyledPrice>{ '$' + millify(coin.market_cap, {precision: 2}) }</StyledPrice>
            <div>
                <StyledPrice>
                    { new Intl.NumberFormat('en-IN', {
                        style: 'currency', 
                        currency: 'USD'
                    }).format(coin.price) }
                </StyledPrice>
                <StyledPriceChange>
                    { new Intl.NumberFormat('en-IN', {
                        style: 'percent',
                        maximumFractionDigits: 2
                    }).format(coin['1d'].price_change_pct) }
                </StyledPriceChange>
            </div>
        </StyledRow>
    );
}

export default Row;