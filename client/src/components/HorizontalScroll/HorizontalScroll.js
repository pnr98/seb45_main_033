/* eslint-disable import/no-unresolved */
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

import 'swiper/css';
// import 'swiper/css/navigation';
import { useRef , useState , useEffect } from 'react';
import { ScrollContainer, ScrollWrap, ArrowBtn } from './HorizontalScroll.styled';
import Recipe from '../Recipe/Recipe'
import {data} from './dummyData'
import ArrowIcon from '../../common/image/ArrowIcon.png'
// https://velog.io/@sohee-k/React-TypeScript-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Swiper-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0image-slider-library
export default function HorizontalScroll() {
    
    const [ list, setList ] = useState(data)
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [ swiperSetting, setSwiperSetting ] = useState(null)

    const settings = {
        spaceBetween: 10,
        slidesPerView: 5,
        // loop: true,
        navigation: {
            nextEl: prevRef.current,
            prevEl: nextRef.current,
        },
        onBeforeInit: (swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.update();
        },
    }

    useEffect(() => {
        if(!swiperSetting) {
            
            setSwiperSetting(settings)
        }
    }, [swiperSetting])
    
    return (
        <ScrollContainer>
            <ScrollWrap>
                <ArrowBtn ref={prevRef}><img src={ArrowIcon} alt='' className='pre'></img></ArrowBtn>
                {swiperSetting && (
                    <Swiper 
                    modules={[Navigation]}
                    navigation
                    {...settings}
                    onSlideChange={() => console.log('slide change')}
                >
                    {list.map((el) => {return <SwiperSlide key={el.id}> <Recipe info={el} /> </SwiperSlide>})}
                </Swiper>
                )}
                <ArrowBtn ref={nextRef}><img src={ArrowIcon} alt='' className='next'></img></ArrowBtn>
            </ScrollWrap>
        </ScrollContainer>
    )
}   