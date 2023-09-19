import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import { BodyContiner, MainContainer, FormContainer, Thumbnail, ButtonContainer, CurrentIngredients, RecipeContainer, IngredientContianer, TagContainer, TagBoxContainer, Tag, CreateButton, InformationMessage } from './UpdateRecipe.styled'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal'

export default function UpdateRecipe() {
    const [showModal, setShowModal] = useState(false);
    const [createModal, setUpdateModal] = useState(false)
    const [ thumbnail, setThumbnail ] = useState('')
    const { recipeId } = useParams();

    const dummyData = {
        "foodTypes": "한식",
        "difficulty": "하",
        "recipeName": "김치찌개",
        "mainImageUrl": "https://source.unsplash.com/random/?Supper",
        "recipeDescription": "두부로 만드는 건강하고 맛있는 한 끼 식사! 오늘은 정말 너~무 맛있어서 다들 맛보셨으면 하는 레시피를 들고 왔답니다! 바로 식물 단백질이 풍부한 두부로 만든 두부 덮밥인데요. 두부 덮밥은 먹음직스럽게 도톰하게 썬 두부를 간장 베이스로 졸여 밥 위에 얹으면 완성! 고추냉이와 다진 생강을 곁들이면 감칠맛이 나기 때문에 이건 꼭 같이 드셔보시길 추천할게요. 만들기도 간단하고 맛도 좋아 누구나 좋아할 두부 덮밥. 이런저런 요리하기 귀찮다면 반찬 필요 없는 두부 덮밥 한 번 만들어 보세요!",
        "userName": "전우치",
        "cookingTime": 30,
        "views": 55,
        "likes": 22,
        "commentCount": 3,
        "timestamp": "2023-08-15T15:49:20.753395",
        "steps": [                     
          {
            "stepNumber": 1,
            "recipeContent": "김치를 손질합니다.",
          },
          {
            "stepNumber": 2,
            "recipeContent": "물과 함께 끓입니다.",
          },
          {
            "stepNumber": 3,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          },
          {
            "stepNumber": 4,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다. 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          },
          {
            "stepNumber": 5,
            "recipeContent": "물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.물과 함께 끓입니다.",
          }
          ],
        "ingredients": [ "김치 10g", "두부 100g", "돼지고기 200g", "고추장 두스푼", "간장 1티스푼", "다진 마늘 4g" ]
      }
    
    const [recipeData, setRecipeData] = useState(null);
    // const [initialRecipeData, setInitialRecipeData] = useState({
    //     memberId: recipeData ? recipeData.memberId : null,
    //     foodType: recipeData ? recipeData.foodType : "",
    //     difficulty: recipeData ? recipeData.difficulty : "",
    //     recipeName: recipeData ? recipeData.recipeName : "",
    //     mainImageUrl: recipeData ? recipeData.mainImageUrl : "",
    //     recipeDescription: recipeData ? recipeData.recipeDescription : "",
    //     cookingTime: recipeData ? recipeData.cookingTime : null,
    //     steps: recipeData ? recipeData.steps : [],
    //     ingredients: recipeData ? recipeData.ingredients : []
    // });

    // 레시피 데이터 get
    useEffect(() => {
        axios.get(`/recipes/${recipeId}`)
            .then((response) => {
                const { data } = response;
                setRecipeData(data)
                setThumbnail(data.mainImageUrl)
                setRecipeContents({
                    title: data.recipeName,
                    description: data.recipeDescription,
                    steps: [...data.steps],
                });
                setIngredientList([data.ingredients]);
                setSelectedTags({
                    category: data.foodTypes,
                    time: data.cookingTime,
                    level: data.difficulty,
                })
            }).catch((err) => {
                console.error("레시피 정보 요청 실패: ", err)
                //
                setRecipeData(dummyData)
                setThumbnail(dummyData.mainImageUrl)
                setRecipeContents({
                    title: dummyData.recipeName,
                    description: dummyData.recipeDescription,
                    steps: [...dummyData.steps],
                });
                setIngredientList(dummyData.ingredients)
                setSelectedTags({
                    category: dummyData.foodTypes,
                    time: dummyData.cookingTime,
                    level: dummyData.difficulty,
                })
            })
    }, [recipeId])
    
    // 썸네일 업로드
    const dragOverHandle = (e) => {
        e.preventDefault();
    };
    const dropHandle = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setThumbnail(imageUrl)
            } else {
                setShowModal(true)
            }
        }
    }
    const inputBtnhandle = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setThumbnail(imageUrl)
            } else {
                setShowModal(true)
            }   
        }
    }
    const resetThumbnail = () => {
        setThumbnail('')
    }

    // 카테고리 선택
    const categories = {
        categoryTag: ["한식", "중식", "일식", "양식", "디저트", "다이어트"],
        timeTag: [10, 20, 30, 40, 50, 60],
        levelTag: ["상", "중", "하"],
    };
    // 모든 선택이 완료되면 true, 그렇지 않으면 false
    const [selectedTags, setSelectedTags] = useState({
        category: null,
        time: null,
        level: null,
    })
    const handleTagClick = (type, value) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [type]: value,
        }))
        console.log("선택된 카테고리:", value);
        console.log("선택된 카테고리:", selectedTags.category);
        console.log("선택된 시간:", selectedTags.time);
        console.log("선택된 레벨:", selectedTags.level);
    }

    // 재료
    const [ingredientInput, setIngredientInput] = useState('')
    const [ingredientList, setIngredientList] = useState([])
    const [duplicationErr, setDuplicationErr] = useState(false)
    const gapRegex = /^\S+$/
    
    const handleEnterPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault(); // 엔터 입력을 방지해 줄바꿈 방지
            addIngredient()
        }
    } 
    const addIngredient = ()=> {
        if (!ingredientInput.trim()) { // 입력이 비어있을 때는 처리하지 않음
            return;
        }
        const [name, quantity] = ingredientInput.split('/') // '/'를 기준으로 name, quantity 할당
        if (name && quantity) {
            const newIngredient = {
                name: name.trim(),
                quantity: quantity.trim(),
            };
        
            if (!ingredientList.some((ingredient) => ingredient.name === newIngredient.name)) {
                setIngredientList([...ingredientList, newIngredient]);
                setIngredientInput(''); // 입력 초기화
                setDuplicationErr(false);
            } else {
                setDuplicationErr(true);
            }
        } else {
            setDuplicationErr(true); // 재료명과 재료량을 모두 입력하지 않았을 경우 오류 처리
        }
    }
    const deleteIngredient = (idx) => {
        const updatedIngredients = [...ingredientList]
        updatedIngredients.splice(idx, 1);
        setIngredientList(updatedIngredients)
    }

    // recipe step
    const [recipeContents, setRecipeContents] = useState({
        title: "",
        description: "",
        steps: [{
            "stepNumber": 1,
            "stepContent": "",
        }],
    })
    const handleOnChange = (e, field) => {
        setRecipeContents({
            ...recipeContents,
            [field]: e.target.value,
        })
        console.log(`${field} : ${e.target.value}`)
    }
    // 레시피 내용 변경
    const handleStepChange = (e, idx) => {
        const updatedSteps = [...recipeContents.steps];
        // updatedSteps[idx] = e.target.value
        updatedSteps[idx] = {
            ...updatedSteps[idx],
            stepContent: e.target.value
        };
        setRecipeContents({
            ...recipeContents,
            steps: updatedSteps,
        })
    }
    // step 추가
    const addStep = () => {
        setRecipeContents((prevRecipeContent) => ({
            ...prevRecipeContent,
            steps: [...prevRecipeContent.steps,
            {   
                stepNumber: prevRecipeContent.steps.length + 1,
                stepContent: "", // 빈 단계 생성
            },]
        }))
    };
    // step 삭제
    const deleteStep = (idx) => {
        setRecipeContents((prevRecipeContent) => {
            const updatedSteps = [...recipeContents.steps];
            // updatedSteps.splice(idx, 1) // 해당 인덱스의 단계 삭제
            if(updatedSteps.length > 0) {
                updatedSteps.pop();
                for(let i = 0; i < updatedSteps.length; i++) {
                    updatedSteps[i].stepNumber = i + 1
                }
            }
            return {
                ...prevRecipeContent,
                steps: updatedSteps, // 업데이트된 단계 배열로 업데이트
            }
        })
    };
    

    // 등록버튼
    const isSubmitEnabled = 
        selectedTags.category && 
        selectedTags.time && 
        selectedTags.level &&
        recipeContents.title.trim() !== "" &&
        recipeContents.description.trim() !== "" &&
        thumbnail !== "" &&
        recipeContents.steps.length > 1 &&
        ingredientList.length > 0;

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        const requestData = {
            "memberId": selectedTags, //
            "foodType": selectedTags.category,
            "difficulty": selectedTags.level,
            "recipeName": recipeContents.title,
            "mainImageUrl": thumbnail,
            "recipeDescription": recipeContents.description,
            "cookingTime": selectedTags.time,
            "ingredients": ingredientList.map((ingredient) => (
                `${ingredient.name} ${ingredient.quantity}`
            )),
            "steps": recipeContents.steps.map((step, idx) => ({
                "stepNumber": idx + 1,
                "stepContent": step.stepContent,
            }))
        };
        console.log(requestData);
        try {
            if (isSubmitEnabled) {
                const header = {
                    Headers: {
                        Authorization: `Bearer {Token}`
                    }
                }
                const response = await axios.patch(`/recipes/${recipeId}`, requestData, header)
                if (response.status === 200) {
                    setUpdateModal(true)
                }
            }
        } catch (err) {
            console.error("레시피 등록 요청 실패:", err);
            //
            console.log(requestData)
            setUpdateModal(true)
        }
    }
    console.log(recipeData);
    
    return (
        <BodyContiner>
            {showModal && <Modal type='Badextension' func={() => setShowModal(false)} />}
            {createModal && <Modal type='Update' func={() => setUpdateModal(false)} recipe_id={recipeId}/>}
            <MainContainer>
                <h1>Edit your recipe !</h1>
                <FormContainer onSubmit={handleUpdatePost}>
                    <Thumbnail>
                        <div>
                            {thumbnail ?
                                <img src={thumbnail} alt='thumbnail' onDrop={dropHandle} onDragOver={dragOverHandle} />
                                :
                                <div id='fileinput' onDrop={dropHandle} onDragOver={dragOverHandle}>
                                    <div>썸네일 이미지를 드래그 앤 드롭 해보세요.</div>
                                    <div>썸네일 이미지는 jpg/png 확장자만 지원합니다.</div>
                                </div>}
                        </div>
                        <ButtonContainer>
                            <CreateButton>
                                파일선택
                                <input type='file' onChange={(e) => inputBtnhandle(e)} />
                            </CreateButton>
                            <CreateButton onClick={resetThumbnail} >
                                초기화
                            </CreateButton>
                        </ButtonContainer>
                    </Thumbnail>

                    <RecipeContainer>
                        <input placeholder='레시피 이름을 입력해 주세요.' value={recipeContents.title} onChange={(e) => handleOnChange(e, 'title')} />
                        <input placeholder='레시피 설명을 입력해 주세요.' value={recipeContents.description} onChange={(e) => handleOnChange(e, 'description')} />
                        <div className='step-container'>
                            <ul>
                                {recipeContents.steps.map((step, idx) => (
                                    <li key={idx}>
                                        <textarea value={step.stepContent} onChange={(e) => handleStepChange(e, idx)} placeholder={`Step ${idx + 1}`} />
                                    </li>
                                ))}
                            </ul>
                            <div className='button-container'>
                                <CreateButton type="button" onClick={addStep} size="small" boxColor="orange">추가</CreateButton>
                                <CreateButton type="button" onClick={deleteStep} size="small">삭제</CreateButton>
                            </div>
                        </div>

                        <IngredientContianer>
                            <input 
                                type='text'
                                placeholder='슬래시(/)를 기준으로 필요한 재료명과 재료량을 입력해주세요. 예시) 감자/10g' 
                                value={ingredientInput} 
                                onChange={(e) => setIngredientInput(e.target.value)} 
                                onKeyPress={handleEnterPress} 
                            />
                            <CurrentIngredients>
                                {ingredientList.length ? (
                                    <div>
                                        <TagBoxContainer>
                                            {ingredientList.map((ingredient, idx) => (
                                                <Tag key={idx} onClick={() => deleteIngredient(idx)}>{ingredient.name}/{ingredient.quantity}</Tag>
                                            ))}
                                        </TagBoxContainer>
                                        <InformationMessage>
                                            <div>재료를 클릭하여 제거할 수 있습니다.</div>
                                            {duplicationErr && <div className='error'>동일한 재료는 입력할 수 없습니다.</div>}
                                        </InformationMessage>
                                    </div>
                                    ) : (
                                    <InformationMessage>
                                        <div>입력한 재료는 이곳에서 확인 가능합니다.</div>
                                        <div>원하는 재료를 입력후 엔터(Enter)키를 눌러주세요</div>
                                    </InformationMessage>
                                    )
                                }
                            </CurrentIngredients>
                        </IngredientContianer>
                    </RecipeContainer>

                    <TagContainer>
                        <div>
                            <h3>음식 종류</h3>
                            <TagBoxContainer>
                                {categories.categoryTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("category", category)}
                                        selected={selectedTags.category === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                        <div>
                            <h3>조리 시간 (min)</h3>
                            <TagBoxContainer>
                                {categories.timeTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("time", category)}
                                        selected={selectedTags.time === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                        <div>
                            <h3>난이도</h3>
                            <TagBoxContainer>
                                {categories.levelTag.map((category, idx) => (
                                    <Tag
                                        tags={[category]}
                                        key={idx}
                                        onClick={() => handleTagClick("level", category)}
                                        selected={selectedTags.level === category}
                                    >{category}</Tag>
                                ))}
                            </TagBoxContainer>
                        </div>
                    </TagContainer>
                    <div className='button-container'>
                        <CreateButton onClick={(e) => handleUpdatePost(e)} disabled={!isSubmitEnabled} boxColor="orange" size="big">레시피 수정</CreateButton>
                    </div>
                </FormContainer>
            </MainContainer>
        </BodyContiner>
    )

}