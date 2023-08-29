import { Link } from "react-router-dom"

const Header = () =>{
    return <div>
        <Link to='/'>
            <button>홈</button>
        </Link>
        <Link to='/login'>
            <button>로그인</button>
        </Link>
        <Link to='/sign-up'>
            <button>회원가입</button>
        </Link>
        <Link to='/mypage'>
            <button>내 정보</button>
        </Link>
    </div>
}

export default Header