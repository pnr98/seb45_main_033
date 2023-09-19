/* eslint-disable import/no-unresolved */
import { Navigation } from 'swiper';
import { useRef , useState , useEffect } from 'react';
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/css';
// import 'swiper/css/navigation';
import { ScrollContainer, ScrollWrap, ArrowBtn, LodingImage } from './HorizontalScroll.styled';
import Recipe from '../Recipe/Recipe'
import {data} from './dummyData'
import ArrowIcon from '../../common/image/ArrowIcon.png'
import dummy from '../../common/data/dummy'

const BASE_URL = process.env.REACT_APP_API_URL;
export default function HorizontalScroll({ recipeId }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [ swiperSetting, setSwiperSetting ] = useState(null)

    const [ relatedRecipes, setRelatedRecipes ] = useState([]);
    const [ offset, setOffset ] = useState(0)
    const [ loading, setLoading ] = useState(false);

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
    const getRelatedData = async () => {
        try{
            setLoading(true);
            const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/related?offset=${offset}`)
            if (response.status === 200) {
                setRelatedRecipes([...relatedRecipes, response.data.relatedRecipes])
                setLoading(false);
                setOffset(offset + 5);
            }
        } catch (err) {
            console.error('관련 레시피 요청 실패:', err);
            setLoading(true);
        }
    };
    useEffect(() => {
        if(!swiperSetting) {
            setSwiperSetting(settings)
        }
        getRelatedData();
    }, [swiperSetting, offset])

    //
    // useEffect(() => {
    //     if(!swiperSetting) {
    //         setSwiperSetting(settings)
    //     }
    // }, [swiperSetting])
    // const [ list, setList ] = useState(dummy)
    // return (
    //     <ScrollContainer>
    //         <ScrollWrap>
    //             <ArrowBtn ref={prevRef}><img src={ArrowIcon} alt='' className='pre'/></ArrowBtn>
    //             {swiperSetting && (
    //                 <Swiper 
    //                 modules={[Navigation]}
    //                 navigation
    //                 {...settings}
    //                 onReachEnd={() => {getRelatedData()}}
    //                 // onSlideChange={() => console.log('slide change')}
    //             >
    //                 {list.map((el) => (
    //                     <SwiperSlide key={el.id}>
    //                         {loading ? (
    //                             <LodingImage>
    //                                 <div>Loading...</div>
    //                             </LodingImage>
    //                         ) : (
    //                             <Recipe info={el} />
    //                         )}
    //                         </SwiperSlide>))}
    //             </Swiper>
    //             )}
    //             <ArrowBtn ref={nextRef}><img src={ArrowIcon} alt='' className='next'/></ArrowBtn>
    //         </ScrollWrap>
    //     </ScrollContainer>
    // )

    return (
        <ScrollContainer>
            <ScrollWrap>
                <ArrowBtn ref={prevRef}><img src={ArrowIcon} alt='' className='pre'/></ArrowBtn>
                {swiperSetting && (
                    <Swiper 
                    modules={[Navigation]}
                    navigation
                    {...settings}
                    onReachEnd={() => {getRelatedData()}}
                    // onSlideChange={() => console.log('slide change')}
                >
                    {relatedRecipes.map((el) => (
                        <SwiperSlide key={el.recipeId}> 
                            {loading ? (
                                <LodingImage>
                                    <div>Loading...</div>
                                </LodingImage>
                            ) : (
                                <Recipe info={el} />
                            )}
                        </SwiperSlide>
                        ))}
                </Swiper>
                )}
                <ArrowBtn ref={nextRef}><img src={ArrowIcon} alt='' className='next'/></ArrowBtn>
                {loading && <p>Loading...</p>}
            </ScrollWrap>
        </ScrollContainer>
    )
}   