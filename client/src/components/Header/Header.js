import {
    HeaderWrapper,
    Logo,
    IconLink,
    ButtonLink,
} from "./Header.styled";

const Header = () => {
    return (
        <HeaderWrapper>
            <Logo>로고</Logo>
            <div>
                <IconLink to="/search">🔍</IconLink>
                <ButtonLink to="/login">
                    <button>로그인</button>
                </ButtonLink>
            </div>
        </HeaderWrapper>
    );
}

export default Header;
