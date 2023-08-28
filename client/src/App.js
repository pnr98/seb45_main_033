import { useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux'
import './App.css';
import { styled } from 'styled-components';
import { setMousePosition } from './redux/action/action';
// const StalkerLing = styled.div`
// @keyframes ani {
//   from {
//     width: 40px;
//     height : 40px;
//     left: ${(props) => props.position.x - 20}px;
//     top: ${(props) => props.position.y - 20}px;
//   }

//   to {
//     width: 60px;
//     height : 60px;
//     left: ${(props) => props.position.x - 30}px;
//     top: ${(props) => props.position.y - 30}px;
//   }
// };
//   border-radius: 50%;
//   position: fixed;
// border: 1px solid #aaa;
// animation : ani 1.5s ease-out infinite;
// `
const MouseStalker = styled.div`

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: hsla(0, 0%, 75%, 0.2);
  position: fixed;
  left: ${(props) => props.position.x - 20}px;
  top: ${(props) => props.position.y - 20}px;
  pointer-events: none;
  border: 1px solid #aaa;
  
`;

function App() {
  const position = useSelector((state)=> state.position) 
  const isHover = useSelector((state)=>state.isHover)
  const dispatch = useDispatch()
  useEffect(() => {
    const handleMouseMove = (event) => {
      dispatch(setMousePosition({ x: event.clientX, y: event.clientY }));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  return (
    <div className="App">
      <MouseStalker position={position} isHover={isHover} />
      {/* <StalkerLing position={position} isHover={isHover} /> */}
    </div>
  );
}

export default App;
