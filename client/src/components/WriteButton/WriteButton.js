import writeButton from '../../common/image/writeButton.png';
import {
  Write,
  Icon,
  Text
} from "./WriteButton.Styled";

const WriteButton = () => {
  return (
    <Write>
      <Icon src={writeButton} alt="Write"/>
      <Text>레시피 작성하기</Text>
    </Write>
  );
};

export default WriteButton;
